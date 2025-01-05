import React from "react";
import { View, Text, StyleSheet, ScrollView, Platform } from "react-native";
import { getCurrentTheme } from "../styles/theme";
import { useEffect, useState } from "react";
import { Appearance } from "react-native";

export default function PrivacyPolicy() {
  const [theme, setTheme] = useState(getCurrentTheme());

  useEffect(() => {
    const listener = Appearance.addChangeListener(() => {
      setTheme(getCurrentTheme());
    });

    return () => listener.remove();
  }, []);

  // Only render on web platform
  if (Platform.OS !== "web") {
    return null;
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.text }]}>
          Privacy Policy
        </Text>

        <Text style={[styles.paragraph, { color: theme.text }]}>
          This privacy policy applies to the Islamic Names Catalog app (hereby
          referred to as "Application") for mobile devices that was created by
          Fahad Waseem (hereby referred to as "Service Provider") as a Free
          service. This service is intended for use "AS IS".
        </Text>

        <Text style={[styles.section, { color: theme.text }]}>
          What information does the Application obtain and how is it used?
        </Text>
        <Text style={[styles.paragraph, { color: theme.text }]}>
          The Application does not obtain any information when you download and
          use it. Registration is not required to use the Application.
        </Text>

        <Text style={[styles.section, { color: theme.text }]}>
          Does the Application collect precise real time location information of
          the device?
        </Text>
        <Text style={[styles.paragraph, { color: theme.text }]}>
          This Application does not collect precise information about the
          location of your mobile device.
        </Text>

        <Text style={[styles.section, { color: theme.text }]}>
          Do third parties see and/or have access to information obtained by the
          Application?
        </Text>
        <Text style={[styles.paragraph, { color: theme.text }]}>
          Since the Application does not collect any information, no data is
          shared with third parties.
        </Text>

        <Text style={[styles.section, { color: theme.text }]}>
          What are my opt-out rights?
        </Text>
        <Text style={[styles.paragraph, { color: theme.text }]}>
          You can stop all collection of information by the Application easily
          by uninstalling it. You may use the standard uninstall processes as
          may be available as part of your mobile device or via the mobile
          application marketplace or network.
        </Text>

        <Text style={[styles.section, { color: theme.text }]}>Children</Text>
        <Text style={[styles.paragraph, { color: theme.text }]}>
          The Application is not used to knowingly solicit data from or market
          to children under the age of 13.
        </Text>
        <Text style={[styles.paragraph, { color: theme.text }]}>
          The Service Provider does not knowingly collect personally
          identifiable information from children. The Service Provider
          encourages all children to never submit any personally identifiable
          information through the Application and/or Services. The Service
          Provider encourage parents and legal guardians to monitor their
          children's Internet usage and to help enforce this Policy by
          instructing their children never to provide personally identifiable
          information through the Application and/or Services without their
          permission. If you have reason to believe that a child has provided
          personally identifiable information to the Service Provider through
          the Application and/or Services, please contact the Service Provider
          (fahadwaseem8@gmail.com) so that they will be able to take the
          necessary actions. You must also be at least 16 years of age to
          consent to the processing of your personally identifiable information
          in your country (in some countries we may allow your parent or
          guardian to do so on your behalf).
        </Text>

        <Text style={[styles.section, { color: theme.text }]}>Security</Text>
        <Text style={[styles.paragraph, { color: theme.text }]}>
          The Service Provider is concerned about safeguarding the
          confidentiality of your information. However, since the Application
          does not collect any information, there is no risk of your data being
          accessed by unauthorized individuals.
        </Text>

        <Text style={[styles.section, { color: theme.text }]}>Changes</Text>
        <Text style={[styles.paragraph, { color: theme.text }]}>
          This Privacy Policy may be updated from time to time for any reason.
          The Service Provider will notify you of any changes to their Privacy
          Policy by updating this page with the new Privacy Policy. You are
          advised to consult this Privacy Policy regularly for any changes, as
          continued use is deemed approval of all changes.
        </Text>

        <Text style={[styles.paragraph, { color: theme.text }]}>
          This privacy policy is effective as of 2024-11-23
        </Text>

        <Text style={[styles.section, { color: theme.text }]}>
          Your Consent
        </Text>
        <Text style={[styles.paragraph, { color: theme.text }]}>
          By using the Application, you are consenting to the processing of your
          information as set forth in this Privacy Policy now and as amended by
          the Service Provider.
        </Text>

        <Text style={[styles.section, { color: theme.text }]}>Contact Us</Text>
        <Text style={[styles.paragraph, { color: theme.text }]}>
          If you have any questions regarding privacy while using the
          Application, or have questions about the practices, please contact the
          Service Provider via email at fahadwaseem8@gmail.com.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    maxWidth: 800,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  section: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 24,
    marginBottom: 12,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
});
