import React, { useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Pressable,
  View,
} from "react-native";

const API_URL = process.env.EXPO_PUBLIC_API_URL?.replace(/\/$/, "");

type ApiState = "idle" | "loading" | "online" | "offline";

export default function App() {
  const [apiState, setApiState] = useState<ApiState>("idle");
  const [apiMessage, setApiMessage] = useState(
    "La conexión con el backend aún no se ha comprobado."
  );

  async function checkBackend() {
    if (!API_URL) {
      setApiState("offline");
      setApiMessage(
        "Falta EXPO_PUBLIC_API_URL. Configura la URL HTTPS del puerto 4000 de Codespaces."
      );
      return;
    }

    setApiState("loading");
    setApiMessage("Comprobando conexión…");

    try {
      const response = await fetch(`${API_URL}/health`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      setApiState("online");
      setApiMessage(`API disponible. Servicio: ${data.service ?? "backend"}`);
    } catch (error) {
      setApiState("offline");
      setApiMessage(
        error instanceof Error
          ? `No se pudo conectar: ${error.message}`
          : "No se pudo conectar con el backend."
      );
    }
  }

  const stateLabel =
    apiState === "online"
      ? "API CONECTADA"
      : apiState === "loading"
      ? "COMPROBANDO"
      : apiState === "offline"
      ? "SIN CONEXIÓN"
      : "PENDIENTE DE COMPROBACIÓN";

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#080D18" />
      <ScrollView contentContainerStyle={styles.page}>
        <View style={styles.top}>
          <View>
            <Text style={styles.brand}>SOCIAL  /  PLATFORM</Text>
            <Text style={styles.overline}>FOUNDATION BUILD · V0.1</Text>
          </View>
          <View style={styles.versionPill}>
            <Text style={styles.versionText}>BETA</Text>
          </View>
        </View>

        <View style={styles.hero}>
          <Text style={styles.kicker}>UNA NUEVA EXPERIENCIA SOCIAL</Text>
          <Text style={styles.title}>Conecta con{'\n'}tu mundo.</Text>
          <Text style={styles.subtitle}>
            Una plataforma para compartir ideas, historias y momentos con tu comunidad.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardEyebrow}>ESTADO DEL SISTEMA</Text>
          <Text style={styles.cardTitle}>{stateLabel}</Text>
          <Text style={styles.cardBody}>{apiMessage}</Text>
          <Pressable
            accessibilityRole="button"
            onPress={checkBackend}
            disabled={apiState === "loading"}
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
              apiState === "loading" && styles.buttonDisabled,
            ]}
          >
            {apiState === "loading" ? (
              <ActivityIndicator color="#07101E" />
            ) : (
              <Text style={styles.buttonText}>Comprobar backend</Text>
            )}
          </Pressable>
        </View>

        <Text style={styles.sectionTitle}>MÓDULOS DEL PRODUCTO</Text>
        <View style={styles.module}>
          <View style={styles.moduleDot} />
          <View style={styles.moduleText}>
            <Text style={styles.moduleTitle}>Aplicación multiplataforma</Text>
            <Text style={styles.moduleDescription}>Base móvil Android, iOS y web.</Text>
          </View>
          <Text style={styles.tagReady}>INICIADA</Text>
        </View>
        <View style={styles.module}>
          <View style={[styles.moduleDot, styles.dotPending]} />
          <View style={styles.moduleText}>
            <Text style={styles.moduleTitle}>Usuarios y perfiles</Text>
            <Text style={styles.moduleDescription}>Pendiente de V0.2.</Text>
          </View>
          <Text style={styles.tagPending}>PENDIENTE</Text>
        </View>
        <View style={styles.module}>
          <View style={[styles.moduleDot, styles.dotPending]} />
          <View style={styles.moduleText}>
            <Text style={styles.moduleTitle}>Publicaciones y feed</Text>
            <Text style={styles.moduleDescription}>Pendiente de V0.3.</Text>
          </View>
          <Text style={styles.tagPending}>PENDIENTE</Text>
        </View>

        <Text style={styles.footer}>
          CONSTRUIDO POR ETAPAS · ESTADO TRANSPARENTE
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#080D18" },
  page: { padding: 24, paddingBottom: 40 },
  top: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 12 },
  brand: { color: "#F5F7FC", fontSize: 17, fontWeight: "900", letterSpacing: 1.4 },
  overline: { color: "#7F91AE", fontSize: 9, letterSpacing: 2, marginTop: 7 },
  versionPill: { borderWidth: 1, borderColor: "#36547D", borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6 },
  versionText: { color: "#8DBBFF", fontSize: 10, fontWeight: "800", letterSpacing: 1 },
  hero: { marginTop: 68, marginBottom: 34 },
  kicker: { color: "#80B5FF", fontSize: 10, fontWeight: "800", letterSpacing: 2 },
  title: { color: "#FFFFFF", fontSize: 48, lineHeight: 53, fontWeight: "900", marginTop: 17 },
  subtitle: { color: "#AAB6CA", fontSize: 15, lineHeight: 24, marginTop: 18, maxWidth: 330 },
  card: { backgroundColor: "#131E31", borderColor: "#263B5B", borderWidth: 1, borderRadius: 20, padding: 20 },
  cardEyebrow: { color: "#8296B5", fontSize: 10, letterSpacing: 1.7, fontWeight: "800" },
  cardTitle: { color: "#FFFFFF", fontSize: 19, fontWeight: "800", marginTop: 12 },
  cardBody: { color: "#AAB6CA", fontSize: 13, lineHeight: 20, marginTop: 9 },
  button: { backgroundColor: "#83B7FF", borderRadius: 12, padding: 15, alignItems: "center", marginTop: 19 },
  buttonPressed: { opacity: 0.8 },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { color: "#07101E", fontWeight: "900", fontSize: 14 },
  sectionTitle: { color: "#8194B1", fontSize: 10, fontWeight: "800", letterSpacing: 2, marginTop: 32, marginBottom: 12 },
  module: { flexDirection: "row", alignItems: "center", backgroundColor: "#10192A", borderRadius: 14, padding: 15, marginBottom: 9, borderWidth: 1, borderColor: "#1C2B42" },
  moduleDot: { width: 9, height: 9, borderRadius: 5, backgroundColor: "#73B7A1", marginRight: 12 },
  dotPending: { backgroundColor: "#65748B" },
  moduleText: { flex: 1 },
  moduleTitle: { color: "#EDF2FA", fontSize: 13, fontWeight: "700" },
  moduleDescription: { color: "#8291A8", fontSize: 11, marginTop: 5 },
  tagReady: { color: "#82D2B8", fontSize: 9, fontWeight: "800" },
  tagPending: { color: "#8291A8", fontSize: 9, fontWeight: "800" },
  footer: { textAlign: "center", color: "#596A84", fontSize: 9, letterSpacing: 1.3, marginTop: 35 },
});
