import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    TextStyle,
    View,
    ViewStyle,
} from "react-native";

type LabeledInputButton = TextInputProps & {
  label: string;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  errorText?: string;
  backgroundColor?: string; // background behind the label to mask the border
  borderColor?: string;
  activeBorderColor?: string;
  errorColor?: string;
};

const LabeledTextInput: React.FC<LabeledInputButton> = ({
  label,
  containerStyle,
  inputStyle,
  labelStyle,
  errorText,
  backgroundColor = "#FFFFFF",
  borderColor = "#CCCCCC",
  activeBorderColor = "#007AFF",
  errorColor = "#D32F2F",
  onFocus,
  onBlur,
  ...rest
}) => {
  const [focused, setFocused] = useState(false);
  const hasError = !!errorText;

  return (
    <View style={[styles.wrapper, containerStyle]}>
      {/* Border container */}
      <View
        style={[
          styles.container,
          { borderColor: hasError ? errorColor : focused ? activeBorderColor : borderColor },
        ]}
      >
        {/* Label overlapping the top-left border */}
        <View
          style={[
            styles.labelWrap,
            { backgroundColor },
          ]}
        >
          <Text
            style={[
              styles.label,
              { color: hasError ? errorColor : focused ? activeBorderColor : "#666" },
              labelStyle,
            ]}
          >
            {label}
          </Text>
        </View>

        {/* Input */}
        <TextInput
          style={[styles.input, inputStyle]}
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          {...rest}
        />
      </View>

      {/* Helper / Error */}
      {!!errorText && (
        <Text style={[styles.helperText, { color: errorColor }]}>{errorText}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
  },
  container: {
    position: "relative",
    borderWidth: 1.5,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  labelWrap: {
    position: "absolute",
    top: -10,       // lifts label above the border
    left: 12,
    paddingHorizontal: 6, // background padding so border is hidden behind
    zIndex: 1,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
  },
  input: {
    fontSize: 16,
    paddingVertical: 4,
  },
  helperText: {
    marginTop: 6,
    fontSize: 12,
  },
});

export default LabeledTextInput;
