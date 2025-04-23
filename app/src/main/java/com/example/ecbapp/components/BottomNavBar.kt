    package com.example.ecbapp.components

    import androidx.compose.foundation.background
    import androidx.compose.foundation.layout.*
    import androidx.compose.foundation.shape.RoundedCornerShape
    import androidx.compose.material3.*
    import androidx.compose.runtime.Composable
    import androidx.compose.ui.Alignment
    import androidx.compose.ui.Modifier
    import androidx.compose.ui.graphics.Brush
    import androidx.compose.ui.graphics.Color
    import androidx.compose.ui.graphics.vector.ImageVector
    import androidx.compose.ui.res.vectorResource
    import androidx.compose.ui.unit.dp
    import com.example.ecbapp.R
    import com.example.ecbapp.model.BottomNavItem

    @Composable
    fun BottomNavBar(
        selectedRoute: String,
        onItemClick: (String) -> Unit
    ) {
        val items = listOf(
            BottomNavItem("admin", R.drawable.ic_profile),
            BottomNavItem("reports", R.drawable.ic_bar),
            BottomNavItem("dashboard", R.drawable.ic_home),
            BottomNavItem("manage", R.drawable.ic_list),
            BottomNavItem("profile", R.drawable.ic_user)
        )

        Box(
            modifier = Modifier
                .fillMaxWidth()
                .height(72.dp)
                .background(
                    brush = Brush.horizontalGradient(
                        listOf(Color(0xFF6A5BFF), Color(0xFF5F86F2))
                    ),
                    shape = RoundedCornerShape(topStart = 20.dp, topEnd = 20.dp)
                )
        ) {
            Row(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(horizontal = 12.dp),
                horizontalArrangement = Arrangement.SpaceEvenly,
                verticalAlignment = Alignment.CenterVertically
            ) {
                items.forEach { item ->
                    val isSelected = item.route == selectedRoute

                    IconButton(onClick = { onItemClick(item.route) }) {
                        Icon(
                            imageVector = ImageVector.vectorResource(item.icon),
                            contentDescription = item.route,
                            tint = if (isSelected) Color.Black else Color.White,
                            modifier = Modifier.size(if (isSelected) 28.dp else 22.dp)
                        )
                    }
                }
            }
        }
    }

