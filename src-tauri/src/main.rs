#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use bcrypt::{hash, verify, DEFAULT_COST};
use std::process::Command;
use tauri_plugin_sql::{Migration, MigrationKind, TauriSql};

#[tauri::command]
fn ssh(address: String) {
    Command::new("gnome-terminal")
        .arg("--")
        .arg("bash")
        .arg("-c")
        .arg(format!("cd ~; ssh ubuntu@{} ; $SHELL", address))
        .output()
        .expect("Something went wrong");
}

#[tauri::command]
fn hash_password(password: String) -> String {
    let hashed = match hash(password, 4) {
        Ok(hashed_string) => hashed_string,
        Err(_e) => panic!("Error while hashing password"),
    };
    return hashed;
}

#[tauri::command]
fn verify_password(password: String, hashed_password: String) -> bool {
    let valid = match verify(password, &hashed_password) {
        Ok(is_matched) => is_matched,
        Err(_e) => panic!(),
    };
    return valid;
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            ssh,
            hash_password,
            verify_password
        ])
        .plugin(TauriSql::default())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

// .add_migrations(
//             "sqlite:appProd.db",
//             vec![Migration {
//                 version: 1,
//                 description: "create tables",
//                 sql: include_str!("../migrations/2.sql"),
//                 kind: MigrationKind::Up,
//             }],
//         )
