import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

type CurrencyModalProps = {
  visible: boolean;
  selectedCurrency: "RS" | "USDT" | null;
  onClose: () => void;
  onSelect: (currency: "RS" | "USDT") => void;
};

const CurrencyModal: React.FC<CurrencyModalProps> = ({
  visible,
  selectedCurrency,
  onClose,
  onSelect,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Select Currency</Text>

          {/* Rupees */}
          <TouchableOpacity
            style={styles.option}
            onPress={() => onSelect("RS")}
          >
            <Text style={styles.optionText}>Rupees (RS)</Text>
            <Ionicons
              name={
                selectedCurrency === "RS"
                  ? "radio-button-on"
                  : "radio-button-off"
              }
              size={22}
              color={Colors.lightWhite}
            />
          </TouchableOpacity>

          {/* USDT */}
          <TouchableOpacity
            style={styles.option}
            onPress={() => onSelect("USDT")}
          >
            <Text style={styles.optionText}>USDT ($)</Text>
            <Ionicons
              name={
                selectedCurrency === "USDT"
                  ? "radio-button-on"
                  : "radio-button-off"
              }
              size={22}
              color={Colors.lightWhite}
            />
          </TouchableOpacity>

          {/* Close Button */}
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CurrencyModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: Colors.lightBlack,
    width: 320,
    padding: 20,
    borderRadius: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
    textAlign: "center",
    color: Colors.lightWhite,
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
  },
  optionText: {
    fontSize: 16,
    color: Colors.lightWhite,
  },
  closeBtn: {
    marginTop: 20,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: "#f0f0f0",
  },
  closeText: {
    textAlign: "center",
    fontWeight: "500",
  },
});
