import { useRef, useState } from "react";
import {
    Animated,
    Easing,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const Chevron = ({ open }) => (
    <Text style={{ fontSize: 18, transform: [{ rotate: open ? "90deg" : "0deg" }] }}>
        ▶
    </Text>
);

/**
 * Props:
 * - title: string | node
 * - children: node (content of the dropdown)
 * - initiallyOpen: boolean
 * - duration: number (ms)
 * - style: container style
 * - headerStyle, contentStyle: style overrides
 */
export default function ExpandableDropdown({
    title = "Title",
    children,
    initiallyOpen = false,
    duration = 250,
    style,
    headerStyle,
    contentStyle,
}) {
    const [open, setOpen] = useState(Boolean(initiallyOpen));
    const anim = useRef(new Animated.Value(initiallyOpen ? 1 : 0)).current;
    const [contentHeight, setContentHeight] = useState(0);

    const toggle = () => {
        const toValue = open ? 0 : 200;
        Animated.timing(anim, {
            toValue,
            duration,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: false, // height animation — cannot use native driver
        }).start();
        setOpen(!open);
    };

    // Interpolate height from 0 to measured contentHeight
    const height = anim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, contentHeight],
        extrapolate: "clamp",
    });

    const opacity = anim.interpolate({
        inputRange: [0, 0.3, 1],
        outputRange: [0, 0.6, 1],
    });

    return (
        <View style={[styles.container, style]}>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={toggle}
                style={[styles.header, headerStyle]}
                accessibilityRole="button"
                accessibilityState={{ expanded: open }}
            >
                <View style={styles.headerLeft}>
                    <Chevron open={open} />
                    <View style={{ width: 8 }} />
                    {typeof title === "string" ? <Text style={styles.title}>{title}</Text> : title}
                </View>

                <Text style={styles.toggleText}>{open ? "Hide" : "Show"}</Text>
            </TouchableOpacity>

            {/* Animated container that clips the inner content */}
            <Animated.View
                style={[
                    styles.contentContainer,
                    {
                        height,
                        opacity,
                    },
                ]}
            >
                <View
                    style={contentStyle}
                    onLayout={(e) => {
                        const h = e.nativeEvent.layout.height;
                        if (h !== contentHeight) setContentHeight(h);
                    }}
                >
                    {children}
                </View>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 8,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 10,
        backgroundColor: "#fff",
        // iOS shadow
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.12,
        shadowRadius: 3,
        // Android elevation
        elevation: 2,
        overflow: Platform.OS === "android" ? "hidden" : "visible", // keep android rendering neat
    },
    header: {
        paddingHorizontal: 12,
        paddingVertical: 14,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    headerLeft: {
        flexDirection: "row",
        alignItems: "center",
    },
    title: {
        fontSize: 16,
    },
    toggleText: {
        fontSize: 13,
        color: "#007AFF",
    },

    contentContainer: {
        overflow: "hidden",
    },
    show: {
        overflow: "visible",
    },

    // This view is used to measure natural height of children (kept in layout flow)
    hiddenMeasure: {
        position: "relative",
        opacity: 0,
        // don't take pointer events
    },

    // The actual visible content is absolutely positioned to overlap measured view
    absoluteContent: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        paddingHorizontal: 12,
        paddingVertical: 10,
    },
});