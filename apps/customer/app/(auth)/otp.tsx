import React, { useEffect, useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View, useWindowDimensions } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, ShieldCheck, Edit2 } from 'lucide-react-native';
import { Button } from '../../src/lib/ui';
import { api } from '../../src/services/api';

const OTP_LEN = 4;

export default function OtpScreen() {
  const router = useRouter();
  const { phone, redirect } = useLocalSearchParams<{ phone: string; redirect?: string }>();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const isWide = width >= 768;
  const inputRef = useRef<TextInput>(null);

  const [otp, setOtp] = useState('1234');
  const [seconds, setSeconds] = useState(25);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (seconds <= 0) return;
    const t = setInterval(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);

  const handleVerify = async () => {
    if (otp.length !== OTP_LEN) return;
    try {
      setLoading(true);
      setErrorMsg('');
      const res = await api.verifyOtp(phone || '9876543210', otp);
      if (res.success) {
        if (redirect) {
          router.replace(redirect as any);
        } else {
          router.replace('/(tabs)');
        }
      } else {
        setErrorMsg('Invalid OTP code. Try 1234.');
      }
    } catch (err: any) {
      setErrorMsg('Verification failed');
    } finally {
      setLoading(false);
    }
  };

  const digits = Array.from({ length: OTP_LEN }, (_, i) => otp[i] ?? '');

  const appendDigit = (digit: string) => {
    if (otp.length < OTP_LEN) {
      setOtp((prev) => prev + digit);
    }
  };

  const removeDigit = () => {
    setOtp((prev) => prev.slice(0, -1));
  };

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      {/* Sticky Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <ArrowLeft size={20} color="#121316" />
        </Pressable>
        <Text style={styles.headerTitle}>OTP Verification</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Scrollable Container so no cut-off on laptop/desktop */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.card, isWide && styles.cardWide]}>
          {/* Logo & Tagline */}
          <View style={styles.brandBox}>
            <Text style={styles.logoText}>drink<Text style={{ color: '#0C831F' }}>it</Text></Text>
            <Text style={styles.logoTagline}>⚡ 10 MINS DELIVERY</Text>
          </View>

          <Text style={styles.title}>Enter OTP Code</Text>
          <Text style={styles.subText}>
            We sent a 4-digit verification code to
          </Text>

          {/* Phone Display Chip */}
          <View style={styles.phoneChip}>
            <Text style={styles.phoneText}>+91 {phone ?? '98765 43210'}</Text>
            <Pressable onPress={() => router.back()}>
              <Edit2 size={14} color="#0C831F" />
            </Pressable>
          </View>

          {/* Invisible Native Input for Desktop Keyboard Typing */}
          <TextInput
            ref={inputRef}
            value={otp}
            onChangeText={(val) => setOtp(val.replace(/[^0-9]/g, '').slice(0, OTP_LEN))}
            keyboardType="number-pad"
            maxLength={OTP_LEN}
            style={styles.hiddenInput}
            autoFocus
          />

          {/* 4 Digit Box Inputs (Clickable to focus keyboard) */}
          <Pressable style={styles.boxesRow} onPress={() => inputRef.current?.focus()}>
            {digits.map((d, i) => (
              <View
                key={i}
                style={[
                  styles.box,
                  (i === otp.length || (i === OTP_LEN - 1 && otp.length === OTP_LEN)) && styles.boxActive,
                  d !== '' && styles.boxFilled,
                ]}
              >
                <Text style={styles.digitText}>{d}</Text>
              </View>
            ))}
          </Pressable>

          {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}

          {/* Resend Row */}
          <View style={styles.resendRow}>
            {seconds > 0 ? (
              <Text style={styles.resendTimer}>
                Resend OTP in <Text style={{ color: '#1C1C1C', fontWeight: '800' }}>00:{String(seconds).padStart(2, '0')}</Text>
              </Text>
            ) : (
              <Pressable onPress={() => setSeconds(30)}>
                <Text style={styles.resendLink}>Resend OTP Code</Text>
              </Pressable>
            )}
          </View>

          {/* Verify CTA */}
          <Button
            label={loading ? 'Verifying...' : 'Verify & Continue →'}
            variant="green"
            fullWidth
            loading={loading}
            onPress={handleVerify}
            style={{ marginTop: 8 }}
          />

          {/* Touch Keypad (Mobile Only, Hidden on Laptop/Desktop) */}
          {!isWide && (
            <View style={styles.keypadContainer}>
              {['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', '⌫'].map((key, index) =>
                key ? (
                  <Pressable
                    key={index}
                    style={({ pressed }) => [styles.keyBtn, pressed && styles.keyPressed]}
                    onPress={() => (key === '⌫' ? removeDigit() : appendDigit(key))}
                  >
                    <Text style={styles.keyText}>{key}</Text>
                  </Pressable>
                ) : (
                  <View key="blank" style={styles.blankKey} />
                ),
              )}
            </View>
          )}

          {/* Security Footer */}
          <View style={styles.securityFooter}>
            <ShieldCheck size={14} color="#0C831F" />
            <Text style={styles.securityText}>Secured by Drinkit · 100% Safe & Encrypted</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F4F6FB' },

  header: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EBEBEB',
    zIndex: 10,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F4F6FB',
    borderWidth: 1,
    borderColor: '#EBEBEB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: { flex: 1, textAlign: 'center', fontSize: 18, fontWeight: '800', color: '#1C1C1C' },

  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },

  card: {
    width: '100%',
    maxWidth: 440,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#EBEBEB',
    padding: 28,
    alignItems: 'center',
    gap: 14,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 3,
  },
  cardWide: { padding: 36 },

  brandBox: { alignItems: 'center', marginBottom: 4 },
  logoText: { fontSize: 32, fontWeight: '900', color: '#1C1C1C', letterSpacing: -0.5 },
  logoTagline: { fontSize: 9, fontWeight: '800', color: '#0C831F', letterSpacing: 1.2, marginTop: -2 },

  title: { fontSize: 22, fontWeight: '900', color: '#1C1C1C' },
  subText: { fontSize: 13, color: '#666666', textAlign: 'center' },

  phoneChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#E8F7EC',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#C6F6D5',
  },
  phoneText: { fontSize: 14, fontWeight: '800', color: '#0C831F' },

  hiddenInput: {
    position: 'absolute',
    opacity: 0,
    width: 1,
    height: 1,
  },

  boxesRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 14,
    marginVertical: 12,
  },
  box: {
    width: 60,
    height: 64,
    borderRadius: 14,
    backgroundColor: '#F4F6FB',
    borderWidth: 1.5,
    borderColor: '#EBEBEB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxActive: {
    borderColor: '#0C831F',
    backgroundColor: '#FFFFFF',
    shadowColor: '#0C831F',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  boxFilled: {
    borderColor: '#0C831F',
    backgroundColor: '#FFFFFF',
  },
  digitText: {
    color: '#1C1C1C',
    fontSize: 26,
    fontWeight: '900',
  },
  errorText: { color: '#EF4444', fontSize: 13, fontWeight: '600' },

  resendRow: { alignItems: 'center' },
  resendTimer: { color: '#666666', fontSize: 13 },
  resendLink: { color: '#0C831F', fontSize: 13, fontWeight: '800' },

  keypadContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 12,
    width: '100%',
  },
  keyBtn: {
    width: '30%',
    height: 48,
    borderRadius: 10,
    backgroundColor: '#F4F6FB',
    borderWidth: 1,
    borderColor: '#EBEBEB',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  keyPressed: { backgroundColor: '#E2E8F0' },
  blankKey: { width: '30%', height: 48, marginBottom: 10 },
  keyText: { color: '#1C1C1C', fontSize: 18, fontWeight: '800' },

  securityFooter: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 8 },
  securityText: { color: '#0C831F', fontSize: 11, fontWeight: '800' },
});

