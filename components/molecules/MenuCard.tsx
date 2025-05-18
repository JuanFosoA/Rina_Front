// MenuCard.tsx
import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";

export default function MenuCard({
  item,
  onPress,
}: {
  item: any;
  onPress: () => void;
}) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Text style={styles.title}>{item.name}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 8,
    padding: 16,
    backgroundColor: "#E9C46A",
    borderRadius: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
});
