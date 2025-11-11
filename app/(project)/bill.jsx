import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";
import { getBillItems } from "../../api/getBillItems";
import { useGlobalContext } from "../../context/GlobaleProvider";
import moment from "moment";
export default function bill() {
  const [bill, setBill] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tva, setTva] = useState('');
  const { billId,client } = useGlobalContext();
  useFocusEffect(
    useCallback(() => {
      if (billId) {
        fetchData();
      } else {
        setLoading(false);
      }
    }, [])
  );
  const fetchData = async () => {
    try {
      const data = await getBillItems(billId);
      setBill(data);
      setItems(data.items);
      setTva(data.taxevalues[0].value);
      setLoading(false);
    } catch (e) {
      console.log("error get project", e);
    }
  };
  return (
    <>
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#007bff" />
        </View>
      ) : !billId ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Aucune facture trouvée </Text>
        </View>
      ) : (
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
              <Text style={{ fontWeight: "bold" }}>
                {bill.number2 ?? bill.number1}
              </Text>
            </Text>
            <Text style={styles.text}>
              Client: <Text style={{ fontWeight: "bold" }}>{client}</Text>
            </Text>
            <Text style={styles.text}>
              Date:{" "}
              <Text style={{ fontWeight: "bold" }}>
                {moment(bill.date2 ?? bill.data1).format("DD/MM/YYYY")}
              </Text>
            </Text>
          </View>

          <View style={styles.card}>
            {/* bill table */}
            <View style={styles.table}>
              <View style={styles.row}>
                <Text style={{ fontWeight: "600", fontSize: 15, width: "10%" }}>
                  N°
                </Text>
                <Text style={{ fontWeight: "600", fontSize: 15, width: "55%" }}>
                  Item
                </Text>
                <Text style={{ fontWeight: "600", fontSize: 15, width: "10%" }}>
                  Qtt
                </Text>
                <Text
                  style={{
                    fontWeight: "600",
                    fontSize: 15,
                    width: "25%",
                    textAlign: "right",
                  }}
                >
                  Total
                </Text>
              </View>
              {items.map((item, index) => (
                <View
                  key={item.id}
                  style={[
                    styles.row,
                    index % 2 === 0
                      ? { backgroundColor: "#fff" }
                      : { backgroundColor: "#f3f4f6" },
                  ]}
                >
                  <Text style={{ fontSize: 15, width: "10%" }}>
                    {index + 1}
                  </Text>
                  <Text style={{ fontSize: 15, width: "55%" }}>
                    {item.description}
                  </Text>
                  <Text style={{ fontSize: 15, width: "10%" }}>
                    {item.quantity}{" "}
                  </Text>
                  <Text
                    style={{ fontSize: 15, width: "25%", textAlign: "right" }}
                  >
                    {(item.price * item.quantity).toFixed(2)} €
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
                <Text style={styles.text}>{bill.ht.toFixed(2)} €</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.text}>TVA {tva}% </Text>
                <Text style={styles.text}>
                  {((bill.ht * tva) / 100).toFixed(2)} €
                </Text>
              </View>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total TTC</Text>
                <Text style={styles.totalValue}>{bill.ttc.toFixed(2)} €</Text>
              </View>
            </View>
          </View>

          {/* <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Download PDF</Text>
      </TouchableOpacity> */}
        </ScrollView>
      )}
    </>
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
    paddingVertical: 16,
    paddingHorizontal: 5,
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
    alignItems:'center',
    marginBottom: 4,
    paddingHorizontal:10,
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
