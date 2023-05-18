// React imports necessary for creating and managing the component
import React, { useState } from 'react';
// React Native and other related component and style imports
import { View, Text, StyleSheet, TouchableOpacity, LayoutAnimation, Platform, UIManager, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';
import { Sizes, Fonts, Colors } from '../../constants/styles';
import { ProgressBar } from 'react-native-paper';

// An array of questions for the political bias quiz
const questions = [
    "1. Do you believe that government should play a major role in distributing wealth to even out society's economic disparities?",
    "2. Do you think that society's traditions and established social order should be mostly preserved?",
    "3. Do you believe that individuals should have the right to make decisions without government interference, even if they might harm themselves?",
    "4. Do you support public spending on programs like healthcare, education, and welfare?",
    "5. Do you believe that businesses and industries should be deregulated and free from government interference?",
    "6. Do you think that society should be more accepting of non-traditional lifestyles and social changes?",
    "7. Do you support higher taxes on the wealthy to fund public services?",
    "8. Do you think that a strong military and national defense should be a government's top priority?",
    "9. Do you believe that environmental regulations are necessary, even if they might hinder businesses and economic growth?",
    "10. Do you believe in the right to own firearms without significant government regulation?"
];

// An array of options that can be chosen as an answer to each question
const options = ["Agree", "Neutral", "Disagree"];

// On Android, we enable LayoutAnimation for better experience
if (
    Platform.OS === 'android' &&
    UIManager.setLayoutAnimationEnabledExperimental
) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

// The main component of the screen
const PoliticalBiasScreen = () => {
     // Initialize states for expanded section, current question, answers, and result
    const [expandedSection, setExpandedSection] = useState('left');
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState(Array(questions.length).fill(null));
    const [result, setResult] = useState(null);

    // Function to handle the expanding and collapsing of the section
    const toggleSection = (section) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpandedSection(section);
    };

    // Function to handle the retake quiz action
    const handleRetakeQuiz = () => {
        setCurrentQuestion(0);
        setAnswers(Array(questions.length).fill(null));
        setResult(null);
    };
    // Function to handle the selected answer of the user
    const handleAnswer = (option) => {
        setAnswers((prev) => {
            const newAnswers = [...prev];
            newAnswers[currentQuestion] = option;
            return newAnswers;
        });
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion((prev) => prev + 1);
        } else {
            // quiz is finished, handle final answers here
            const leftAnswers = answers.filter(answer => answer === 'Agree').length;
            const rightAnswers = answers.filter(answer => answer === 'Disagree').length;
            const centerAnswers = answers.filter(answer => answer === 'Neutral').length;

            if (leftAnswers > rightAnswers && leftAnswers > centerAnswers) {
                setResult('Your political bias leans towards the Left. This means you tend to favor social equality and egalitarianism.');
            } else if (rightAnswers > leftAnswers && rightAnswers > centerAnswers) {
                setResult('Your political bias leans towards the Right. This means you tend to favor tradition, limited government, and free market capitalism.');
            } else if (centerAnswers > leftAnswers && centerAnswers > rightAnswers) {
                setResult('Your political bias is Centered. This means you tend to take a balanced approach, favoring moderate positions.');
            } else {
                setResult('Your political bias is mixed. This means you have a balance of Left, Right, and Center views.');
            }
        }
    };

    // Render the component UI
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.blackColor} />
            <View style={{ flex: 1, }}>
                <View style={styles.headerWrapStyle}>
                    <Text style={{ ...Fonts.whiteColor20Bold }}>
                        Focus
                    </Text>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.container}>
                        <View style={styles.headerWrapStyle}>
                            <Text style={{ ...Fonts.whiteColor20Bold }}>
                                Political Bias
                            </Text>
                        </View>
                        <View style={styles.sectionContainer}>
                            <TouchableOpacity style={[styles.section, expandedSection === 'left' && styles.expanded]} onPress={() => toggleSection('left')}>
                                <Icon name="arrow-left" type="font-awesome-5" color="blue" size={40} />
                                {expandedSection === 'left' &&
                                    <ScrollView>
                                        <Text style={styles.sectionText}>
                                            <Text style={styles.sectionTitle}>What is<Text style={{ color: 'blue' }}>"Left"</Text></Text>{"\n"}
                                            {"\n"}&gt; The "left" is usually associated first with key words such as social justice and peace, and is more liberal in its political approach and views.{"\n"}
                                            {"\n"}&gt; It emerged during the Enlightenment and was further developed during the Industrial Revolution.{"\n"}
                                            {"\n"}&gt; Characterized by an emphasis on equality, fraternity, progress and reform.{"\n"}
                                            {"\n"}&gt; Advocates of government intervention in the economy.
                                        </Text>
                                    </ScrollView>
                                }
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.section, expandedSection === 'center' && styles.expanded]} onPress={() => toggleSection('center')}>
                                <Icon name="arrow-up" type="font-awesome-5" color="grey" size={40} />
                                {expandedSection === 'center' &&
                                    <ScrollView>
                                        <Text style={styles.sectionText}>
                                            <Text style={styles.sectionTitle}>What is <Text style={{ color: 'grey' }}>"Center"</Text></Text>{"\n"}
                                            {"\n"}&gt; The "center" is usually emphasizes pragmatism and cooperation and is somewhere between the Left and the Right.{"\n"}
                                            {"\n"}&gt; Originated in the late 19th and early 20th centuries, during a period of political turmoil in Europe.{"\n"}
                                            {"\n"}&gt; Emphasizes the defense of individual rights while also supporting government intervention when necessary, trying to find compromise and balance between different factions.
                                        </Text>
                                    </ScrollView>
                                }
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.section, expandedSection === 'right' && styles.expanded]} onPress={() => toggleSection('right')}>
                                <Icon name="arrow-right" type="font-awesome-5" color="red" size={40} />
                                {expandedSection === 'right' &&
                                    <ScrollView>
                                        <Text style={styles.sectionText}>
                                            <Text style={styles.sectionTitle}>What is <Text style={{ color: 'red' }}>"Right"</Text></Text>{"\n"}
                                            {"\n"}&gt; The "right" is usually emphasizes individualism and is more conservative in its political approach and views.{"\n"}
                                            {"\n"}&gt; The Enlightenment period emerged as a distinct political viewpoint that gained importance during the Industrial Revolution.{"\n"}
                                            {"\n"}&gt; Characterized by authority, hierarchy, and tradition.{"\n"}
                                            {"\n"}&gt; Prioritizes individual liberty and supports a free-market economy as well as minimal government intervention.
                                        </Text>
                                    </ScrollView>
                                }
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.quizTitle}>Test Your Political Bias</Text>
                        <View style={styles.quizContainer}>
                            {!result ? (
                                <>
                                    <ProgressBar progress={currentQuestion / questions.length} color={Colors.primary} />
                                    <View style={styles.questionContainer}>
                                        <Text style={styles.question}>{questions[currentQuestion]}</Text>
                                    </View>
                                    <View style={styles.optionsContainer}>
                                        {options.map((option, index) => (
                                            <Button
                                                key={index}
                                                title={option}
                                                buttonStyle={styles.optionButton}
                                                containerStyle={{ margin: 5 }}
                                                titleStyle={{ fontSize: 14, fontFamily: 'OpenSans_SemiBold' }} // Add your font size and family here
                                                onPress={() => handleAnswer(option)}
                                            />
                                        ))}
                                    </View>
                                </>
                            ) : null}
                            {/* </View> */}
                            {result && (
                                <View style={styles.resultContainer}>
                                    <Text style={styles.resultText}>{result}</Text>
                                    <Button
                                        title="Retake Quiz"
                                        buttonStyle={styles.retakeButton}
                                        titleStyle={{ fontSize: 14, fontFamily: 'OpenSans_SemiBold' }} // Add your font size and family here
                                        onPress={handleRetakeQuiz}
                                    />
                                </View>
                            )}
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backColor,
        padding: Sizes.fixPadding,
    },
    sectionContainer: {
        flex: 1,
        backgroundColor: Colors.backColor,
        padding: Sizes.fixPadding,
        marginLeft: 2 * Sizes.fixPadding,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    section: {
        backgroundColor: '#1e1e1e',
        borderRadius: 10,
        padding: Sizes.fixPadding,
        marginBottom: 20,
        marginLeft: -2 * Sizes.fixPadding,
        flexDirection: 'row',
        alignItems: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 3,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFF',
        textAlign: 'center',
        marginBottom: 10,
    },
    headerWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding + 5.0,
    },

    sectionText: {
        color: '#fff',
        marginLeft: Sizes.fixPadding,
        marginRight: 2 * Sizes.fixPadding,
        fontSize: 14,
        fontFamily: 'OpenSans_Medium'

    },
    expandedSection: {
        backgroundColor: '#1e1e1e',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 3,
    },
    collapsedSection: {
        backgroundColor: '#1e1e1e',
        borderRadius: 10,
        padding: Sizes.fixPadding,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        flex: 0.3,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 3,
    },
    quizTitle: {
        ...Fonts.whiteColor20Bold,
        margin: Sizes.fixPadding * 2.0,
    },
    quizContainer: {
        backgroundColor: '#1e1e1e',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
    },
    question: {
        ...Fonts.whiteColor14Bold,
        margin: Sizes.fixPadding * 2.0,
    },
    optionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        margin: 0.5 * Sizes.fixPadding,
        marginLeft: 4.5 * Sizes.fixPadding,
    },
    buttonTitle: {
        fontSize: 15,
        fontFamily: 'OpenSans_SemiBold',
    },
    optionButton: {
        width: '65%', // reduce the width from '60%' to '30%'
        // paddingVertical: 10, // you can adjust this as needed
    },
    resultContainer: {
        backgroundColor: '#65737e',
        borderRadius: Sizes.fixPadding - 5.0,
        padding: Sizes.fixPadding * 2.0,
    },
    resultText: {
        ...Fonts.whiteColor14Bold,
        marginBottom: 4 * Sizes.fixPadding
    },
    questionContainer: {
        height: 120
    },
    expanded: {
        flex: 3,
    },
});

export default PoliticalBiasScreen;