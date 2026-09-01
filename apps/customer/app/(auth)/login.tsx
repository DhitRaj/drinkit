import React, { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Zap, ShieldCheck, Lock, Wine, ArrowLeft } from 'lucide-react-native';
import { Button } from '../../src/lib/ui';
import { api } from '../../src/services/api';

export default function LoginScreen() {
  const router = useRouter();
  const { mode: initialMode, redirect } = useLocalSearchParams<{ mode?: string; redirect?: string }>();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const isWide = width >= 768;

  const [mode, setMode] = useState<'login' | 'signup'>(
    initialMode === 'signup' ? 'signup' : 'login',
  );
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const valid = /^[6-9]\d{9}$/.test(phone);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleContinue = async () => {
    try {
      setLoading(true);
      setErrorMsg('');
      const res = await api.sendOtp(phone);
      if (res.success) {
        router.push({
          pathname: '/(auth)/otp',
          params: { phone, mode, ...(redirect ? { redirect } : {}) },
        });
      } else {
        setErrorMsg(res.message || 'Failed to send OTP');
      }
    } catch (err: any) {
      setErrorMsg('Cannot connect to backend server');
    } finally {
      setLoading(false);
    }
  };

  const featureItems = [
    { label: '⚡ 10 min express delivery', Icon: Zap },
    { label: '100% genuine products', Icon: ShieldCheck },
    { label: 'Secure & private checkout', Icon: Lock },
    { label: '200+ curated beverage brands', Icon: Wine },
  ];

  if (isWide) {
    return (
      <View style={styles.wideRoot}>
        {/* Left: Branding Panel */}
        <View style={styles.leftPanel}>
          <View style={styles.leftContent}>
            <Text style={styles.wideLogo}>
              drink<Text style={{ color: '#F8CB46' }}>it</Text>
            </Text>
            <Text style={styles.wideTagline}>
              Instant grocery & beverages,{'\n'}delivered in 10 mins
            </Text>
            <Text style={styles.wideSubTag}>From licensed dark stores near you</Text>
            <View style={styles.wideFeatures}>
              {featureItems.map(({ label, Icon }) => (
                <View key={label} style={styles.wideFeatureRow}>
                  <Icon size={16} color="#F8CB46" strokeWidth={2.5} />
                  <Text style={styles.wideFeatureText}>{label}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Right: Form Panel */}
        <View style={styles.rightPanel}>
          <ScrollView contentContainerStyle={styles.formScroll} showsVerticalScrollIndicator={false}>
            <View style={styles.formCard}>
              {/* Mini logo */}
              <Text style={styles.formLogo}>
                drink<Text style={{ color: '#0C831F' }}>it</Text>
              </Text>
              <Text style={styles.formTitle}>
                {mode === 'login' ? 'Welcome Back' : 'Create Account'}
              </Text>
              <Text style={styles.formSub}>
                {mode === 'login'
                  ? 'Login to continue ordering'
                  : 'Join thousands of happy customers'}
              </Text>

              {/* Mode Toggle */}
              <View style={styles.tabContainer}>
                <Pressable onPress={() => setMode('login')} style={[styles.tab, mode === 'login' && styles.tabActive]}>
                  <Text style={[styles.tabText, mode === 'login' && styles.tabTextActive]}>Login</Text>
                </Pressable>
                <Pressable onPress={() => setMode('signup')} style={[styles.tab, mode === 'signup' && styles.tabActive]}>
                  <Text style={[styles.tabText, mode === 'signup' && styles.tabTextActive]}>Sign Up</Text>
                </Pressable>
              </View>

              {/* Name field (signup only) */}
              {mode === 'signup' && (
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Full Name</Text>
                  <TextInput
                    value={name}
                    onChangeText={setName}
                    placeholder="Enter your full name"
                    placeholderTextColor="#9E9E9E"
                    style={styles.input}
                  />
                </View>
              )}

              {/* Phone Field */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Mobile Number</Text>
                <View style={styles.phoneInputRow}>
                  <View style={styles.flagBox}>
                    <Text style={styles.flagText}>+91</Text>
                  </View>
                  <TextInput
                    value={phone}
                    onChangeText={(t) => setPhone(t.replace(/\D/g, '').slice(0, 10))}
                    placeholder="10-digit mobile number"
                    placeholderTextColor="#9E9E9E"
                    keyboardType="phone-pad"
                    maxLength={10}
                    style={styles.phoneInput}
                  />
                </View>
              </View>

              {/* Password Field (Optional) */}
              <View style={styles.inputGroup}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text style={styles.label}>Password (Optional)</Text>
                  {mode === 'login' && (
                    <Pressable>
                      <Text style={styles.forgotLink}>Forgot?</Text>
                    </Pressable>
                  )}
                </View>
                <View style={styles.passwordRow}>
                  <TextInput
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Enter password"
                    placeholderTextColor="#9E9E9E"
                    secureTextEntry={!showPassword}
                    style={styles.passwordInput}
                  />
                  <Pressable onPress={() => setShowPassword(!showPassword)} style={styles.eyeBtn}>
                    <Text style={styles.eyeText}>{showPassword ? 'Hide' : 'Show'}</Text>
                  </Pressable>
                </View>
              </View>

              {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}

              {/* Submit CTA */}
              <Button
                label={loading ? 'Sending OTP...' : 'Continue with OTP →'}
                variant="green"
                fullWidth
                disabled={!valid}
                loading={loading}
                onPress={handleContinue}
                style={{ marginTop: 8 }}
              />

              <Text style={styles.termsText}>
                By continuing, you agree to Drinkit's Terms of Service & Privacy Policy. Must be 18+ to order.
              </Text>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }

  // ── Mobile layout ──
  return (
    <View style={[styles.mobileRoot, { paddingTop: insets.top }]}>
      <View style={styles.mobileHeader}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <ArrowLeft size={20} color="#1C1C1C" />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.mobileScroll} showsVerticalScrollIndicator={false}>
        <View style={styles.mobileCard}>
          <Text style={styles.mobileLogo}>
            drink<Text style={{ color: '#0C831F' }}>it</Text>
          </Text>
          <Text style={styles.formTitle}>
            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
          </Text>
          <Text style={styles.formSub}>
            Enter mobile number to receive 4-digit OTP
          </Text>

          {/* Mode Toggle */}
          <View style={styles.tabContainer}>
            <Pressable onPress={() => setMode('login')} style={[styles.tab, mode === 'login' && styles.tabActive]}>
              <Text style={[styles.tabText, mode === 'login' && styles.tabTextActive]}>Login</Text>
            </Pressable>
            <Pressable onPress={() => setMode('signup')} style={[styles.tab, mode === 'signup' && styles.tabActive]}>
              <Text style={[styles.tabText, mode === 'signup' && styles.tabTextActive]}>Sign Up</Text>
            </Pressable>
          </View>

          {mode === 'signup' && (
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Full Name</Text>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Enter your full name"
                placeholderTextColor="#9E9E9E"
                style={styles.input}
              />
            </View>
          )}

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Mobile Number</Text>
            <View style={styles.phoneInputRow}>
              <View style={styles.flagBox}>
                <Text style={styles.flagText}>+91</Text>
              </View>
              <TextInput
                value={phone}
                onChangeText={(t) => setPhone(t.replace(/\D/g, '').slice(0, 10))}
                placeholder="10-digit mobile number"
                placeholderTextColor="#9E9E9E"
                keyboardType="phone-pad"
                maxLength={10}
                style={styles.phoneInput}
              />
            </View>
          </View>

          {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}

          <Button
            label={loading ? 'Sending OTP...' : 'Get OTP →'}
            variant="green"
            fullWidth
            disabled={!valid}
            loading={loading}
            onPress={handleContinue}
            style={{ marginTop: 12 }}
          />

          <Text style={styles.termsText}>
            By continuing, you agree to Drinkit's Terms. You must be 18+ to place orders.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wideRoot: { flex: 1, flexDirection: 'row', backgroundColor: '#F4F6FB' },
  leftPanel: { flex: 1, backgroundColor: '#1C1C1C', justifyContent: 'center', padding: 60 },
  leftContent: { maxWidth: 440, gap: 20 },
  wideLogo: { fontSize: 44, fontWeight: '900', color: '#FFFFFF' },
  wideTagline: { fontSize: 32, fontWeight: '900', color: '#FFFFFF', lineHeight: 40 },
  wideSubTag: { color: 'rgba(255,255,255,0.7)', fontSize: 16 },
  wideFeatures: { gap: 14, marginTop: 10 },
  wideFeatureRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  wideFeatureText: { color: '#FFFFFF', fontSize: 14, fontWeight: '600' },

  rightPanel: { flex: 1, backgroundColor: '#F4F6FB' },
  formScroll: { flexGrow: 1, justifyContent: 'center', padding: 40 },
  formCard: {
    maxWidth: 420,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#EBEBEB',
    padding: 32,
    gap: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 3,
  },
  formLogo: { fontSize: 28, fontWeight: '900', color: '#1C1C1C' },
  formTitle: { fontSize: 22, fontWeight: '900', color: '#1C1C1C' },
  formSub: { fontSize: 13, color: '#666666', marginTop: -8 },

  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#F4F6FB',
    borderRadius: 12,
    padding: 4,
    borderWidth: 1,
    borderColor: '#EBEBEB',
  },
  tab: { flex: 1, paddingVertical: 10, borderRadius: 8, alignItems: 'center' },
  tabActive: { backgroundColor: '#FFFFFF', shadowColor: '#000000', shadowOpacity: 0.05, shadowRadius: 4 },
  tabText: { fontSize: 13, fontWeight: '700', color: '#666666' },
  tabTextActive: { color: '#0C831F' },

  inputGroup: { gap: 6 },
  label: { fontSize: 12, fontWeight: '700', color: '#1C1C1C' },
  input: {
    height: 48,
    borderRadius: 12,
    backgroundColor: '#F4F6FB',
    borderWidth: 1.5,
    borderColor: '#EBEBEB',
    paddingHorizontal: 14,
    fontSize: 14,
    color: '#1C1C1C',
  },

  phoneInputRow: {
    flexDirection: 'row',
    height: 48,
    borderRadius: 12,
    backgroundColor: '#F4F6FB',
    borderWidth: 1.5,
    borderColor: '#EBEBEB',
    overflow: 'hidden',
  },
  flagBox: {
    backgroundColor: '#EBEBEB',
    paddingHorizontal: 12,
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: '#E2E8F0',
  },
  flagText: { fontSize: 13, fontWeight: '800', color: '#1C1C1C' },
  phoneInput: { flex: 1, paddingHorizontal: 14, fontSize: 15, fontWeight: '800', color: '#1C1C1C' },

  passwordRow: {
    flexDirection: 'row',
    height: 48,
    borderRadius: 12,
    backgroundColor: '#F4F6FB',
    borderWidth: 1.5,
    borderColor: '#EBEBEB',
    overflow: 'hidden',
    alignItems: 'center',
  },
  passwordInput: { flex: 1, paddingHorizontal: 14, fontSize: 14, color: '#1C1C1C' },
  eyeBtn: { paddingHorizontal: 14 },
  eyeText: { color: '#0C831F', fontSize: 12, fontWeight: '800' },
  forgotLink: { color: '#0C831F', fontSize: 12, fontWeight: '800' },

  errorText: { color: '#EF4444', fontSize: 13, fontWeight: '600' },
  termsText: { color: '#9E9E9E', fontSize: 11, textAlign: 'center', lineHeight: 16 },

  mobileRoot: { flex: 1, backgroundColor: '#F4F6FB' },
  mobileHeader: { paddingHorizontal: 16, paddingVertical: 12 },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EBEBEB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mobileScroll: { flexGrow: 1, justifyContent: 'center', padding: 20 },
  mobileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#EBEBEB',
    padding: 24,
    gap: 14,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 3,
  },
  mobileLogo: { fontSize: 32, fontWeight: '900', color: '#1C1C1C' },
});

