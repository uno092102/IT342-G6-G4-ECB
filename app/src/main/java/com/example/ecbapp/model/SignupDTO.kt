package com.example.ecbapp.model

data class SignupDTO(
    val fname: String,
    val lname: String,
    val email: String,
    val username: String,
    val password: String,
    val phoneNumber: String,
    val address: String
)