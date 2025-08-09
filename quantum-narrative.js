// Quantum-Inspired Narrative Engine - Web Version
// Lightweight quantum mechanics simulation for browser-based horror storytelling

class QuantumNarrative {
    constructor() {
        this.narrativeStates = {
            temporal: ['linear', 'folded', 'stretched', 'recursive'],
            tension: ['building', 'peak', 'release', 'reset'],
            reality: ['stable', 'shifting', 'fractured', 'collapsed']
        };
        
        this.entanglements = {
            'linear': ['building', 'stable'],
            'folded': ['peak', 'shifting'],
            'stretched': ['release', 'fractured'],
            'recursive': ['reset', 'collapsed']
        };

        this.horrorThemes = {
            'linear-building-stable': 'supernatural-suspense',
            'folded-peak-shifting': 'reality-horror',
            'stretched-release-fractured': 'psychological-terror',
            'recursive-reset-collapsed': 'cosmic-horror'
        };

        this.isActive = false;
        this.currentState = null;
    }

    // Initialize quantum engine
    initialize() {
        this.isActive = true;
        this.currentState = this.measureNarrativeState();
        console.log('🔬 Quantum Narrative Engine Initialized', this.currentState);
        return this.currentState;
    }

    // Simulate quantum superposition with weighted randomness
    createSuperposition(states) {
        const weights = states.map(() => Math.random());
        const totalWeight = weights.reduce((sum, w) => sum + w, 0);
        return weights.map(w => w / totalWeight);
    }

    // Simulate quantum entanglement between narrative elements
    entangleStates(state1, state2) {
        const entangled = this.entanglements[state1];
        if (entangled && entangled.includes(state2)) {
            return { entangled: true, correlation: 0.8 };
        }
        return { entangled: false, correlation: Math.random() * 0.5 };
    }

    // Collapse quantum state into specific narrative outcome
    measureNarrativeState() {
        const temporal = this.collapseState(this.narrativeStates.temporal);
        const tension = this.collapseState(this.narrativeStates.tension);
        const reality = this.collapseState(this.narrativeStates.reality);

        // Apply entanglement effects
        const entanglement = this.entangleStates(temporal, tension);
        
        const state = {
            temporal,
            tension,
            reality,
            entanglement,
            coherence: this.calculateCoherence(temporal, tension, reality),
            horrorTheme: this.getHorrorTheme(temporal, tension, reality),
            timestamp: Date.now(),
            id: this.generateStateId()
        };

        this.currentState = state;
        return state;
    }

    // Simulate wave function collapse
    collapseState(states) {
        const probabilities = this.createSuperposition(states);
        const random = Math.random();
        let accumulator = 0;
        
        for (let i = 0; i < states.length; i++) {
            accumulator += probabilities[i];
            if (random < accumulator) {
                return states[i];
            }
        }
        return states[states.length - 1];
    }

    // Calculate narrative coherence based on quantum state
    calculateCoherence(temporal, tension, reality) {
        const stateValues = {
            'linear': 1.0, 'folded': 0.7, 'stretched': 0.5, 'recursive': 0.3,
            'building': 0.8, 'peak': 1.0, 'release': 0.6, 'reset': 0.2,
            'stable': 1.0, 'shifting': 0.7, 'fractured': 0.4, 'collapsed': 0.1
        };
        
        return (stateValues[temporal] + stateValues[tension] + stateValues[reality]) / 3;
    }

    // Get horror theme based on quantum state
    getHorrorTheme(temporal, tension, reality) {
        const key = `${temporal}-${tension}-${reality}`;
        return this.horrorThemes[key] || 'existential-dread';
    }

    // Generate unique state ID
    generateStateId() {
        return `quantum_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    // Generate horror-specific quantum narrative prompts
    generateQuantumPrompt(narrativeState = this.currentState) {
        if (!narrativeState) return null;

        const prompts = {
            'linear-building-stable': 'The story unfolds in perfect chronological order, but something sinister builds beneath the surface. Each moment leads inevitably to horror...',
            'folded-peak-shifting': 'Time bends back on itself as terror reaches its climax, reality warping around the protagonist like a twisted möbius strip...',
            'stretched-release-fractured': 'Moments stretch into eternity as tension breaks, leaving fragments of a shattered timeline scattered through consciousness...',
            'recursive-reset-collapsed': 'The same horrific events repeat endlessly as reality crumbles into quantum uncertainty, each loop more terrifying than the last...',
            'linear-peak-fractured': 'A straightforward tale suddenly shatters at its climax, leaving the reader questioning what was real...',
            'folded-building-collapsed': 'Nested timelines compress as dread accumulates, reality folding in on itself like origami made of nightmares...',
            'stretched-reset-shifting': 'Extended moments of calm precede a sudden reset, as if the universe itself is holding its breath...',
            'recursive-release-stable': 'Cyclical patterns finally break, but the stability that follows feels more ominous than the chaos...'
        };

        const key = `${narrativeState.temporal}-${narrativeState.tension}-${narrativeState.reality}`;
        return prompts[key] || `Quantum narrative state collapsed into ${narrativeState.horrorTheme} with ${(narrativeState.coherence * 100).toFixed(1)}% coherence.`;
    }

    // Integration with existing AI writing tools
    enhanceAIPrompt(userPrompt, options = {}) {
        if (!this.isActive) this.initialize();

        const quantumState = options.useCurrentState ? this.currentState : this.measureNarrativeState();
        const quantumEnhancement = this.generateQuantumPrompt(quantumState);
        
        return {
            originalPrompt: userPrompt,
            quantumEnhancement,
            combinedPrompt: `${userPrompt}\n\n🔬 Quantum Narrative Context: ${quantumEnhancement}`,
            coherence: quantumState.coherence,
            horrorTheme: quantumState.horrorTheme,
            metadata: {
                quantumState,
                experimentalFeature: true,
                timestamp: Date.now()
            }
        };
    }

    // Get quantum writing suggestions
    getQuantumSuggestions() {
        if (!this.currentState) this.initialize();

        const suggestions = {
            'supernatural-suspense': [
                'Add unexplained phenomena that follow quantum uncertainty principles',
                'Create characters who exist in multiple states until observed',
                'Use probabilistic events rather than deterministic plot points'
            ],
            'reality-horror': [
                'Explore parallel timelines converging catastrophically',
                'Show reality "glitching" like quantum decoherence',
                'Create scenes where observation changes the outcome'
            ],
            'psychological-terror': [
                'Fragment memories like quantum superposition',
                'Show mental states collapsing under observation',
                'Use quantum entanglement as metaphor for psychological connections'
            ],
            'cosmic-horror': [
                'Incorporate infinite recursive loops of existence',
                'Show the universe resetting through quantum fluctuations',
                'Explore consciousness as quantum phenomena'
            ],
            'existential-dread': [
                'Question the nature of reality through quantum mechanics',
                'Show free will as quantum uncertainty',
                'Explore the observer effect on personal identity'
            ]
        };

        return {
            theme: this.currentState.horrorTheme,
            suggestions: suggestions[this.currentState.horrorTheme] || suggestions['existential-dread'],
            coherence: this.currentState.coherence,
            stateInfo: this.currentState
        };
    }

    // Generate quantum-influenced story elements
    generateStoryElements() {
        if (!this.currentState) this.initialize();

        const elements = {
            character: this.generateQuantumCharacter(),
            setting: this.generateQuantumSetting(),
            conflict: this.generateQuantumConflict(),
            theme: this.currentState.horrorTheme
        };

        return elements;
    }

    generateQuantumCharacter() {
        const characters = {
            'linear': 'A meticulous researcher who documents supernatural events in chronological order',
            'folded': 'A time-displaced individual experiencing their life out of sequence',
            'stretched': 'Someone trapped in extended moments of terror',
            'recursive': 'A person caught in repeating cycles of horror'
        };
        return characters[this.currentState.temporal];
    }

    generateQuantumSetting() {
        const settings = {
            'stable': 'A seemingly normal location hiding quantum anomalies',
            'shifting': 'A place where reality constantly fluctuates',
            'fractured': 'Multiple overlapping dimensions in one space',
            'collapsed': 'A location where all possibilities exist simultaneously'
        };
        return settings[this.currentState.reality];
    }

    generateQuantumConflict() {
        const conflicts = {
            'building': 'Quantum uncertainties accumulating toward catastrophe',
            'peak': 'Reality collapsing under observation',
            'release': 'Sudden decoherence revealing hidden horrors',
            'reset': 'Forced return to an impossible starting state'
        };
        return conflicts[this.currentState.tension];
    }

    // Admin panel integration
    getAdminInfo() {
        return {
            isActive: this.isActive,
            currentState: this.currentState,
            stateHistory: this.stateHistory || [],
            engineVersion: '1.0.0-quantum'
        };
    }

    // Reset quantum state
    resetQuantumState() {
        this.currentState = null;
        this.isActive = false;
        console.log('🔬 Quantum Engine Reset');
    }
}

// Export for both Node.js and browser
if (typeof module !== 'undefined' && module.exports) {
    module.exports = QuantumNarrative;
} else if (typeof window !== 'undefined') {
    window.QuantumNarrative = QuantumNarrative;
}

// Auto-initialize if in browser
if (typeof window !== 'undefined') {
    window.quantumNarrative = new QuantumNarrative();
}
