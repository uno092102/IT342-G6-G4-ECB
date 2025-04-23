package com.example.ecbapp.screens

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.res.vectorResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.text.input.VisualTransformation
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import com.example.ecbapp.R
import com.example.ecbapp.components.BottomNavBar
import com.example.ecbapp.ui.theme.Primary
import androidx.compose.ui.res.painterResource


@Composable
fun AdminLoginScreen(
    navController: NavController,
    selectedRoute: String,
    onItemClick: (String) -> Unit
) {
    var username by remember { mutableStateOf("") }
    var password by remember { mutableStateOf("") }
    var passwordVisible by remember { mutableStateOf(false) }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(horizontal = 24.dp),
        horizontalAlignment = Alignment.Start // 👈 Change from CenterHorizontally to Start
    ) {
        Spacer(modifier = Modifier.height(110.dp))

        Text("Admin Login", fontSize = 28.sp, fontWeight = FontWeight.Bold, color = Primary)
        Text("Enter user and password to log in!", fontSize = 14.sp, color = Color.Gray)

        Spacer(modifier = Modifier.height(28.dp))

        OutlinedTextField(
            value = username,
            onValueChange = { username = it },
            label = { Text("User*") },
            placeholder = { Text("Admin") },
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(12.dp)
        )

        Spacer(modifier = Modifier.height(16.dp))

        OutlinedTextField(
            value = password,
            onValueChange = { password = it },
            label = { Text("Password*") },
            placeholder = { Text("Admin password") },
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(12.dp),
            visualTransformation = if (passwordVisible) VisualTransformation.None else PasswordVisualTransformation(),
            trailingIcon = {
                IconButton(onClick = { passwordVisible = !passwordVisible }) {
                    Icon(
                        painter = painterResource(id = if (passwordVisible) R.drawable.ic_visibility_off else R.drawable.ic_visibility),
                        contentDescription = if (passwordVisible) "Hide password" else "Show password",
                        modifier = Modifier.size(20.dp)
                    )
                }
            }
        )

        Spacer(modifier = Modifier.height(12.dp))

        Text(
            text = "Forget password?",
            fontSize = 12.sp,
            color = Primary,
            modifier = Modifier
                .align(Alignment.End)
                .clickable {
                    // navController.navigate("resetNewPassword")
                }
        )

        Spacer(modifier = Modifier.height(24.dp))

        Button(
            onClick = {
                // TODO: Implement Admin Login Logic
            },
            modifier = Modifier
                .fillMaxWidth()
                .height(50.dp),
            shape = RoundedCornerShape(12.dp),
            colors = ButtonDefaults.buttonColors(containerColor = Primary)
        ) {
            Text("Login", color = Color.White, fontSize = 16.sp)
        }

        Spacer(modifier = Modifier.weight(1f))

        BottomNavBar(
            selectedRoute = selectedRoute,
            onItemClick = onItemClick
        )
    }
}
