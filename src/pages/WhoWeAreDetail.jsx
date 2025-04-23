import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import WWRHeroSection from '../components/WWRHeroSection'
import IPDModal from '../components/IPDModal'
import IDPValueCreationSection from '../components/IDPValueCreationSection'
import WhyChooseUs from '../components/WhyChooseUs'

export default function WhoWeAreDetail() {
    const [isLoading, setIsLoading] = useState(true);
    const [componentsLoaded, setComponentsLoaded] = useState({
        hero: false,
        modal: false,
        valueCreation: false,
        whyChooseUs: false
    });

    // Check if all components are loaded
    useEffect(() => {
        const allLoaded = Object.values(componentsLoaded).every(loaded => loaded);
        if (allLoaded) {
            // Add a small delay for smoother transition
            setTimeout(() => setIsLoading(false), 500);
        }
    }, [componentsLoaded]);

    // Ensure page shows even if components take too long
    useEffect(() => {
        const timeout = setTimeout(() => setIsLoading(false), 5000);
        return () => clearTimeout(timeout);
    }, []);

    const handleComponentLoad = (component) => {
        setComponentsLoaded(prev => ({
            ...prev,
            [component]: true
        }));
    };
    return (
        <>
            <AnimatePresence>
                {isLoading && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black flex items-center justify-center"
                    >
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-12 rounded-full border-4 border-t-transparent animate-spin"
                                style={{ borderImage: 'linear-gradient(to right, #2A72F8, #8F44EC) 1' }} />
                            <p className="mt-4 text-white/80 text-sm">Loading...</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isLoading ? 0 : 1 }}
                transition={{ duration: 0.5 }}
            >
                <WWRHeroSection onLoad={() => handleComponentLoad('hero')} />
                <IPDModal onLoad={() => handleComponentLoad('modal')} />
                <IDPValueCreationSection onLoad={() => handleComponentLoad('valueCreation')} />
                <WhyChooseUs onLoad={() => handleComponentLoad('whyChooseUs')} />
            </motion.div>
        </>
    )
}
