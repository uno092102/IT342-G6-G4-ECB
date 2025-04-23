package com.example.ecbapp.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.res.vectorResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import com.example.ecbapp.R
import com.example.ecbapp.components.BottomNavBar
import com.example.ecbapp.ui.theme.Primary

// Mock Data
val sampleUsers = listOf(
    User("112", "Mithlesh", "Kritipur, Kathmandu", "12358G", "987569326"),
    User("112", "Mithlesh", "Kritipur, Kathmandu", "12358G", "987569326"),
    User("112", "Mithlesh", "Kritipur, Kathmandu", "12358G", "987569326"),
    User("112", "Mithlesh", "Kritipur, Kathmandu", "12358G", "987569326")
)

data class User(
    val uid: String,
    val name: String,
    val address: String,
    val scno: String,
    val amount: String
)

@Composable
fun ManageUserScreen(
    navController: NavController,
    selectedRoute: String,
    onItemClick: (String) -> Unit
) {
    Column(modifier = Modifier.fillMaxSize().padding(20.dp)) {
        Spacer(modifier = Modifier.height(70.dp))

        Text("Manage User", fontSize = 26.sp, fontWeight = FontWeight.Bold, color = Primary)
        Text("User Details", fontSize = 18.sp, color = Primary, fontWeight = FontWeight.SemiBold)

        Spacer(modifier = Modifier.height(12.dp))

        Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
            Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                Text("UID", fontSize = 12.sp, fontWeight = FontWeight.SemiBold)
                Text("Name", fontSize = 12.sp, fontWeight = FontWeight.SemiBold)
                Text("Address", fontSize = 12.sp, fontWeight = FontWeight.SemiBold)
                Text("SCNO", fontSize = 12.sp, fontWeight = FontWeight.SemiBold)
                Text("Amount", fontSize = 12.sp, fontWeight = FontWeight.SemiBold)
            }
            Button(
                onClick = { /* Add user logic */ },
                shape = RoundedCornerShape(12.dp),
                colors = ButtonDefaults.buttonColors(containerColor = Primary),
                contentPadding = PaddingValues(horizontal = 16.dp, vertical = 8.dp)
            ) {
                Text("Add User", color = Color.White, fontSize = 12.sp)
            }
        }

        Spacer(modifier = Modifier.height(10.dp))

        LazyColumn(modifier = Modifier.weight(1f)) {
            items(sampleUsers) { user ->
                UserRow(user)
            }
        }

        BottomNavBar(selectedRoute = selectedRoute, onItemClick = onItemClick)
    }
}

@Composable
fun UserRow(user: User) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 8.dp)
            .background(Color.White),
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.CenterVertically
    ) {
        Column(modifier = Modifier.weight(1f)) {
            Text(user.uid, fontSize = 12.sp)
            Text(user.name, fontSize = 12.sp)
            Text(user.address, fontSize = 12.sp)
        }
        Column(modifier = Modifier.weight(1f)) {
            Text(user.scno, fontSize = 12.sp)
            Text(user.amount, fontSize = 12.sp)
        }
        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            Icon(
                imageVector = ImageVector.vectorResource(R.drawable.ic_edit),
                contentDescription = "Edit",
                tint = Primary,
                modifier = Modifier.size(20.dp).clickable { }
            )
            Icon(
                imageVector = ImageVector.vectorResource(R.drawable.ic_delete),
                contentDescription = "Delete",
                tint = Color.Red,
                modifier = Modifier.size(20.dp).clickable { }
            )
        }
    }
}