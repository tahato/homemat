import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { useGlobalContext } from "../context/GlobaleProvider";

export default function HomeInfoCard({ project }) {
  const { setProjectName } = useGlobalContext();
  const client =
    (project?.fname ? project?.fname : "") +
    " " +
    (project.lname ? project.lname : "");
  const responsable =
    (project?.fnameResp ? project?.fnameResp : "") +
    " " +
    (project.nameResp ? project.nameResp : "");

  let percentPayed = 0;
  let percentDelay = 0;
  if (30 > 0) {
    percentPayed = ((50 / 100) * 100).toFixed(2);
  }
  if (10 > 0) {
    percentDelay = ((50 / 100) * 100).toFixed(2);
  }

  const handlePress = () => {
    setProjectName(project.name);
    router.push(`/${project.id}`);
  };

  const radius = 40;
  const strokeWidth = 12;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * percentPayed) / 100;
  const strokeDashoffsetDelay =
    circumference - (circumference * (percentPayed + percentDelay)) / 100;

  return (
    <TouchableOpacity style={styles.cardContainer} onPress={handlePress}>
      {/* <View style={styles.cardHeader}>
                <Text style={{ fontFamily: 'jura', fontSize: 17 }}>Projet  </Text>
                <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 15 }}>  001-0925</Text>
                <Text style={{ fontSize: 12 }}>Terry Martin le bonoit allegro</Text>
            </View> */}

      <View style={styles.infoContainer}>
        <View style={styles.cardInfo}>
          <View style={styles.details}>
            <Text style={{ fontWeight: "bold" }}>Client: </Text>
            <Text style={{ flexWrap: "wrap" }}>
              {responsable.length > 42
                ? responsable.substring(0, 42) + "..."
                : responsable}
            </Text>
          </View>
          <View style={styles.details}>
            <Text style={{ fontWeight: "bold" }}>Client: </Text>
            <Text style={{ flexWrap: "wrap" }}>
              {client.length > 42 ? client.substring(0, 42) + "..." : client}
            </Text>
          </View>
          <View style={styles.details}>
            <Text style={{ fontWeight: "bold" }}>Montant:</Text>
            <Text>{parseFloat(project.ttc).toFixed(2)} €</Text>
          </View>
          <View style={styles.details}>
            <Text style={{ fontWeight: "bold" }}>Etats: </Text>
            <Text>
              {(project.quotation_level == 1 || null) &&
              project.order_level == null
                ? "Estimation"
                : project.order_level == 2 && project.state == null
                ? "Bon de commande"
                : project.state != null && project.state < 5
                ? "Production"
                : project.state >= 5 && "Livraison"}
            </Text>
          </View>

          {/* <View style={styles.details}>
            <Text style={{ fontWeight: "bold" }}>Cloturé le:</Text>
            <Text>--/--/----</Text>
          </View> */}
        </View>
        <View style={styles.svg}>
          <View>
            <Text
              style={{
                fontFamily: "jura",
                fontSize: 15,
                textAlign: "center",
              }}
            >
              {project.name}
            </Text>
            {/* <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 13 }}>001-0925</Text> */}
          </View>
          <Svg width={90} height={90} viewBox="0 0 100 100">
            <Circle
              cx="50"
              cy="50"
              r={radius}
              stroke="#E5E5E5"
              strokeWidth={strokeWidth}
              fill="none"
            />
            <Circle
              cx="50"
              cy="50"
              r={radius}
              stroke="#F66161"
              strokeWidth={strokeWidth}
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffsetDelay}
              strokeLinecap="round"
              rotation="-90"
              origin="50,50"
            />
            <Circle
              cx="50"
              cy="50"
              r={radius}
              stroke="#00C853"
              strokeWidth={strokeWidth}
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              rotation="-90"
              origin="50,50"
            />
            <Text style={styles.percentage}>55</Text>
          </Svg>
        </View>
      </View>

      {/* <View style={styles.details}>
        <Text style={{ fontSize: 11 }}> Terry Martin le bonoit allegro</Text>
      </View> */}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: "white",
  },
  cardHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 5,
    paddingVertical: 10,
    width: "100%",
  },
  infoContainer: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  svg: {
    justifyContent: "center",
    alignItems: "center",
    width: "100px",
    height: "100px",
    position: "relative",
  },
  // className="absolute text-lg font-semibold text-gray-800"
  percentage: {
    position: "absolute",
    fontFamily: "Jura",
    color: "black",
    top: 35,
    left: 35,
  },
  cardInfo: {
    display: "flex",
    width: "50%",
    // justifyContent: 'center',
  },

  details: {
    display: "flex",
    flexDirection: "row",
    alignItems: "stretch",
    padding: 5,
  },
});
