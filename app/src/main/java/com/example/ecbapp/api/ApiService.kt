package com.example.ecbapp.api

import retrofit2.http.*
import retrofit2.Response
import com.example.ecbapp.model.LoginRequest
import com.example.ecbapp.model.LoginResponse
import com.example.ecbapp.model.UserProfile
import com.example.ecbapp.model.RegisterRequest
import com.example.ecbapp.model.RegisterResponse
import okhttp3.ResponseBody

interface ApiService {

    @GET("customer/profile")
    suspend fun getProfile(): Response<UserProfile>

    @POST("/customer/login")
    suspend fun login(@Body request: Map<String, String>): Response<Map<String, Any>>

    @POST("/customer/signup")
    suspend fun register(@Body request: RegisterRequest): Response<ResponseBody>

}
