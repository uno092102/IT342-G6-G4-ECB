package com.example.ecbapp.api

import retrofit2.http.*
import retrofit2.Response
import com.example.ecbapp.model.LoginRequest
import com.example.ecbapp.model.LoginResponse
import com.example.ecbapp.model.UserProfile

interface ApiService {

    @GET("customer/profile")
    suspend fun getProfile(): Response<UserProfile>

    @POST("auth/login")
    suspend fun login(@Body loginRequest: LoginRequest): Response<LoginResponse>
}
