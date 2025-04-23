package com.example.ecbapp.nav

import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.currentBackStackEntryAsState
import androidx.navigation.compose.rememberNavController
import com.example.ecbapp.screens.*

@Composable
fun AppNavigation() {
    val navController = rememberNavController()
    val navBackStackEntry by navController.currentBackStackEntryAsState()
    val currentRoute = navBackStackEntry?.destination?.route ?: "dashboard"

    NavHost(
        navController = navController,
        startDestination = "dashboard"
    ) {
        composable("login") {
            LoginScreen(navController)
        }
        composable("register") {
            RegisterScreen(navController)
        }
        composable("resetNewPassword") {
            ResetNewPasswordScreen(navController)
        }
        composable("resetPasswordOauth") {
            ResetPasswordOauthScreen(navController)
        }
        composable("verification") {
            VerificationScreen(navController)
        }
        composable("dashboard") {
            DashboardScreen(
                navController = navController,
                selectedRoute = currentRoute,
                onItemClick = { route ->
                    if (route != currentRoute) {
                        navController.navigate(route) {
                            popUpTo("dashboard") { inclusive = false }
                            launchSingleTop = true
                        }
                    }
                }
            )
        }
        composable("reports") {
            ReportsScreen(
                navController = navController,
                selectedRoute = currentRoute,
                onItemClick = { route ->
                    if (route != currentRoute) {
                        navController.navigate(route) {
                            popUpTo("reports") { inclusive = false }
                            launchSingleTop = true
                        }
                    }
                }
            )
        }
        // Add other screens similarly:
        composable("admin") {
            AdminLoginScreen(
                navController = navController,
                selectedRoute = currentRoute,
                onItemClick = { route ->
                    if (route != currentRoute) {
                        navController.navigate(route) {
                            popUpTo("admin") { inclusive = false }
                            launchSingleTop = true
                        }
                    }
                }
            )
        }
        // composable("manage") { ManageUsersScreen(...) }
        composable("manage") {
            ManageUserScreen(
                navController = navController,
                selectedRoute = currentRoute,
                onItemClick = { route ->
                    if (route != currentRoute) {
                        navController.navigate(route) {
                            popUpTo("manage") { inclusive = false }
                            launchSingleTop = true
                        }
                    }
                }
            )
        }
        // composable("profile") { ProfileScreen(...) }
        composable("profile") {
            YourProfileScreen(
                navController = navController,
                selectedRoute = currentRoute,
                onItemClick = { route ->
                    if (route != currentRoute) {
                        navController.navigate(route) {
                            popUpTo("profile") { inclusive = false }
                            launchSingleTop = true
                        }
                    }
                }
            )
        }
    }
}
