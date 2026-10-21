import { Feather } from "@expo/vector-icons";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../../context/AuthContext";

export default function Header() {
    const { currentUser, logout } = useAuth();

    const handleProfilePress = () => {
        Alert.alert(
            "FocusFlow Account",
            `Logged in as ${currentUser?.email || "alex@focusflow.app"}`,
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Log Out",
                    style: "destructive",
                    onPress: () => logout(),
                },
            ]
        );
    };

    return (
        <View className="flex-row items-center justify-between mb-4">
            <View className="flex-row items-center gap-3">
                <View className="w-10 h-10 rounded-xl bg-white border border-indigo-100 items-center justify-center shadow-xs">
                    <View className="w-6 h-6 rounded-full border-[3px] border-indigo-600 items-center justify-center">
                        <View className="w-2 h-2 rounded-full bg-indigo-600" />
                    </View>
                </View>
                <View>
                    <Text className="text-lg font-black text-gray-900 tracking-tight">
                        FocusFlow
                    </Text>
                    <Text className="text-xs text-gray-400 font-medium">
                        Home Dashboard
                    </Text>
                </View>
            </View>

            {/* Action Icons */}
            <View className="flex-row items-center gap-2.5">
                <TouchableOpacity
                    onPress={() => Alert.alert("Notifications", "You have no unread focus alerts.")}
                    className="w-10 h-10 rounded-full bg-white border border-slate-200/80 items-center justify-center shadow-xs"
                >
                    <Feather name="bell" size={18} color="#4B5563" />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={handleProfilePress}
                    className="w-10 h-10 rounded-full bg-indigo-600 items-center justify-center shadow-xs"
                >
                    <Feather name="user" size={18} color="#FFFFFF" />
                </TouchableOpacity>
            </View>
        </View>
    );
}
