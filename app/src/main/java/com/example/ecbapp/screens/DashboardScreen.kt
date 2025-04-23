package com.example.ecbapp.screens

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.res.vectorResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import androidx.navigation.compose.currentBackStackEntryAsState
import com.example.ecbapp.R
import com.example.ecbapp.components.BottomNavBar
import com.example.ecbapp.ui.theme.LightBlue
import com.example.ecbapp.ui.theme.Primary

@Composable
fun DashboardScreen(
    navController: NavController,
    selectedRoute: String,
    onItemClick: (String) -> Unit
) {
    val currentRoute = navController.currentBackStackEntryAsState().value?.destination?.route ?: "dashboard"

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(horizontal = 20.dp)
    ) {
        Spacer(modifier = Modifier.height(90.dp))

        Text(
            text = "Main Dashboard",
            fontSize = 26.sp,
            fontWeight = FontWeight.Bold,
            color = Color(0xFF1D1D1D)
        )

        Spacer(modifier = Modifier.height(20.dp))

        // Statistic Cards
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(14.dp)
        ) {
            StatCard("Total Payments", "Php. 200,000", R.drawable.ic_payment, Modifier.weight(1f))
            StatCard("Active users", "22", R.drawable.ic_users, Modifier.weight(1f))
        }

        Spacer(modifier = Modifier.height(30.dp))

        // Line Chart Placeholder
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .height(180.dp)
                .clip(RoundedCornerShape(18.dp))
                .background(Color(0xFFF5F6FA)),
            contentAlignment = Alignment.Center
        ) {
            Text("Line Chart", color = Color.LightGray)
        }

        Spacer(modifier = Modifier.height(26.dp))

        // Pie Chart Placeholder
        Text(
            text = "Payment Analysis",
            fontSize = 20.sp,
            fontWeight = FontWeight.SemiBold,
            color = Color(0xFF1D1D1D)
        )

        Spacer(modifier = Modifier.height(16.dp))

        Box(
            modifier = Modifier.fillMaxWidth(),
            contentAlignment = Alignment.Center
        ) {
            Box(
                modifier = Modifier
                    .size(120.dp)
                    .clip(CircleShape)
                    .background(LightBlue),
                contentAlignment = Alignment.Center
            ) {
                Text("Pie", color = Color.White)
            }
        }

        Spacer(modifier = Modifier.height(12.dp))

        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceEvenly
        ) {
            StatLabel("Payments Done", "63%")
            StatLabel("Payments Pending", "25%")
        }

        Spacer(modifier = Modifier.weight(1f))

        // ✅ Responsive Bottom Navigation Bar
        BottomNavBar(
            selectedRoute = selectedRoute,
            onItemClick = onItemClick
        )
    }
}

@Composable
fun StatCard(label: String, value: String, iconId: Int, modifier: Modifier = Modifier) {
    Surface(
        shape = RoundedCornerShape(18.dp),
        border = BorderStroke(1.dp, Color.LightGray),
        modifier = modifier
    ) {
        Row(
            modifier = Modifier
                .padding(14.dp)
                .fillMaxWidth(),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Icon(
                imageVector = ImageVector.vectorResource(id = iconId),
                contentDescription = null,
                tint = Primary,
                modifier = Modifier.size(22.dp)
            )
            Spacer(modifier = Modifier.width(12.dp))
            Column {
                Text(text = label, fontSize = 12.sp, color = Color.Gray)
                Text(text = value, fontWeight = FontWeight.Bold, fontSize = 14.sp)
            }
        }
    }
}

@Composable
fun StatLabel(label: String, value: String) {
    Column(horizontalAlignment = Alignment.CenterHorizontally) {
        Text(label, fontSize = 12.sp, color = Color.Gray)
        Text(value, fontWeight = FontWeight.Bold)
    }
}
