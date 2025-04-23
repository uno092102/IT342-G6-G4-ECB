package com.example.ecbapp.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.ecbapp.components.BottomNavBar
import com.example.ecbapp.ui.theme.LightBlue
import androidx.navigation.NavController
import androidx.navigation.compose.currentBackStackEntryAsState

@Composable
fun ReportsScreen(
    navController: NavController,
    selectedRoute: String,
    onItemClick: (String) -> Unit
) {
    val currentRoute = navController.currentBackStackEntryAsState().value?.destination?.route ?: "reports"

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(horizontal = 20.dp)
    ) {
        Spacer(modifier = Modifier.height(90.dp))

        Text(
            text = "REPORTS",
            fontSize = 26.sp,
            fontWeight = FontWeight.ExtraBold
        )

        Spacer(modifier = Modifier.height(10.dp))

        Text(
            text = "Payment Details",
            fontSize = 16.sp,
            fontWeight = FontWeight.SemiBold
        )

        Spacer(modifier = Modifier.height(10.dp))

        // Table Header
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            listOf("Users", "Address", "Date", "Amount").forEach {
                Text(it, fontSize = 12.sp, color = Color.Gray)
            }
        }

        Spacer(modifier = Modifier.height(6.dp))

        // Table Rows (Static)
        repeat(4) {
            Row(
                modifier = Modifier.fillMaxWidth().padding(vertical = 4.dp),
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Text("Mithlesh", fontSize = 14.sp)
                Text("Kritipur, Kathmandu", fontSize = 14.sp)
                Text("12.Jan.2021", fontSize = 14.sp)
                Text("₱ 2500", fontSize = 14.sp)
            }
        }

        Spacer(modifier = Modifier.height(28.dp))

        Text(
            text = "Weekly Payments",
            fontSize = 18.sp,
            fontWeight = FontWeight.Bold
        )

        Spacer(modifier = Modifier.height(20.dp))

        // Weekly Bar Chart (Mock)
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceEvenly
        ) {
            listOf("17", "18", "19", "20").forEach {
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Box(
                        modifier = Modifier
                            .width(24.dp)
                            .height(100.dp)
                            .clip(RoundedCornerShape(8.dp))
                            .background(
                                brush = Brush.verticalGradient(
                                    colors = listOf(
                                        Color(0xFFD0D4E6),
                                        LightBlue,
                                        Color(0xFF6A5BFF)
                                    )
                                )
                            )
                    )
                    Spacer(modifier = Modifier.height(4.dp))
                    Text(it, fontSize = 12.sp, color = Color.LightGray)
                }
            }
        }

        Spacer(modifier = Modifier.weight(1f))

        BottomNavBar(
            selectedRoute = selectedRoute,
            onItemClick = onItemClick
        )
    }
}
