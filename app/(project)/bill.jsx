import { Ionicons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, View } from "react-native";
export default function bill() {
  const bill = {
    number: "INV-2034",
    date: "09 Nov 2025",
    customer: "John Doe",
    items: [
      { name: "Plan de pose et de calepinage", qty: 2, price: 5 },
      { name: "Excellence (3x2m)", qty: 1, price: 3 },
      { name: "item 2", qty: 1, price: 3 },
    ],
    taxRate: 0.05,
  };

  const subtotal = bill.items.reduce((t, i) => t + i.qty * i.price, 0);
  const tax = subtotal * bill.taxRate;
  const total = subtotal + tax;

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="receipt-outline" size={28} color="#293846" />
        <Text style={styles.title}> Facture</Text>
      </View>

      {/* Info section */}
      <View style={styles.card}>
        <Text style={styles.text}>
          Plan de pose N°:{" "}
          <Text style={{ fontWeight: "bold" }}>{bill.number}</Text>
        </Text>
        <Text style={styles.text}>
          Client: <Text style={{ fontWeight: "bold" }}>{bill.customer}</Text>
        </Text>
        <Text style={styles.text}>
          Date: <Text style={{ fontWeight: "bold" }}>{bill.date}</Text>
        </Text>
      </View>

      <View style={styles.card}>
        {/* bill table */}
        <View style={styles.table}>
          <View style={styles.row}>
            <Text style={{ fontWeight: "600", fontSize: 15, width: "10%" }}>N°</Text>
            <Text style={{ fontWeight: "600", fontSize: 15, width: "50%" }}>Item</Text>
            <Text style={{ fontWeight: "600", fontSize: 15, width: "20%" }}>Qtt</Text>
            <Text style={{ fontWeight: "600", fontSize: 15, width: "20%", textAlign: "right" }}>
              Total
            </Text>
          </View>
          {bill.items.map((item, index) => (
            <View
              key={index}
              style={[
                styles.row,
                index % 2 === 0
                  ? { backgroundColor: "#fff" }
                  : { backgroundColor: "#f3f4f6" },
              ]}
            >
              <Text style={{ fontSize: 15, width: "10%" }}>{index + 1}</Text>
              <Text style={{ fontSize: 15, width: "50%" }}>{item.name}</Text>
              <Text style={{ fontSize: 15, width: "20%" }}>{item.qty}</Text>
              <Text style={{ fontSize: 15, width: "20%", textAlign: "right" }}>
                {(item.qty * item.price).toFixed(2)}€
              </Text>
            </View>
          ))}
        </View>
        {/* Totals */}
      </View>
      <View style={{ alignItems: "flex-end" }}>
        <View style={[styles.card]}>
          <View style={styles.row}>
            <Text style={styles.text}>TOTAL HT </Text>
            <Text style={styles.text}>{subtotal.toFixed(2)} €</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>TVA % 20 </Text>
            <Text style={styles.text}>{tax.toFixed(2)} €</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total TTC</Text>
            <Text style={styles.totalValue}>1658.80 €</Text>
          </View>
        </View>
      </View>

      {/* <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Download PDF</Text>
      </TouchableOpacity> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    // marginBottom: 16,
    padding: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#293846",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  text: {
    fontSize: 15,
    color: "#4B5563",
    marginBottom: 4,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  totalRow: {
    flexDirection: "row",
    gap: 10,
  },
  // herderText: {
  //   fontWeight: "600",
  //   color: "#111827",
  // },

  // itemText: {
  //   fontSize: 15,
  //   color: "#374151",
  // },
  itemPrice: {
    width: "25%",
    fontSize: 15,
    color: "#111827",
    fontWeight: "500",
    textAlign: "right",
  },
  // total:{
  //   // width:'50%',
  //   justifyContent:"flex-end",
  //   alignItems:'flex-end',
  // },
  totalLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#293846",
  },
  // button: {
  //   backgroundColor: "#1C84C6",
  //   borderRadius: 16,
  //   paddingVertical: 14,
  //   alignItems: "center",
  //   marginBottom: 30,
  // },
  // buttonText: {
  //   color: "#FFFFFF",
  //   fontSize: 16,
  //   fontWeight: "600",
  // },
});
