
import React from 'react';
import { Box, Container, Typography, Button, Paper, useTheme, useMediaQuery } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { motion } from 'framer-motion';

const Section = styled(Box)(({ theme }) => ({
    position: 'relative',
    paddingTop: theme.spacing(12), // Give space for the hero bleed
    paddingBottom: theme.spacing(12),
    color: '#fff',
    overflow: 'hidden',
    // Decorative dots in top-left corner
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '300px',
        height: '300px',
        // Make dots lighter/more visible: rgba(255, 255, 255, 0.1) or similar
        backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.15) 2px, transparent 2px)',
        backgroundSize: '20px 20px',
        maskImage: 'radial-gradient(circle at top left, black 60%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(circle at top left, black 60%, transparent 100%)',
        zIndex: 0,
    },
    // Optional: another subtle patch bottom right
    '&::after': {
        content: '""',
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: '300px',
        height: '300px',
        backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.15) 2px, transparent 2px)',
        backgroundSize: '20px 20px',
        maskImage: 'radial-gradient(circle at bottom right, black 60%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(circle at bottom right, black 60%, transparent 100%)',
        zIndex: 0,
    }
}));

const InnerContainer = styled(Container)(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: theme.spacing(8),
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
        gridTemplateColumns: '1fr',
        padding: theme.spacing(4),
        gap: theme.spacing(4),
        paddingTop: theme.spacing(12), // More padding on mobile
    },
}));

const ImageWrapper = styled(Box)(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.spacing(2),
    overflow: 'hidden',
    boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
    '&::before': {
        content: '""',
        display: 'block',
        paddingTop: '100%', // Square aspect ratio or similar
    },
}));

const StyledImage = styled('img')({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
});

const ContentWrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),
}));

const Heading = styled(Typography)(({ theme }) => ({
    fontFamily: 'PostNoBillsJaffna, sans-serif', // Assuming stick with display font for headers, or maybe Inter based on screenshot look
    // Screenshot header looks like Inter or Roboto bold, not huge stencil. 
    // Let's use standard sans-serif but bold.
    fontFamily: 'Inter, sans-serif',
    fontWeight: 700,
    fontSize: '2.5rem',
    lineHeight: 1.2,
    color: '#e2e8f0',
    [theme.breakpoints.down('sm')]: {
        fontSize: '2rem',
    },
}));

const Text = styled(Typography)(({ theme }) => ({
    fontSize: '1rem',
    lineHeight: 1.7,
    color: '#fff',
    marginBottom: theme.spacing(1),
}));

const StyledButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#c6a045', // Gold color
    color: '#1a1a1a',
    textTransform: 'none',
    fontSize: '1rem',
    fontWeight: 700,
    padding: '12px 32px',
    borderRadius: '4px',
    alignSelf: 'flex-start',
    '&:hover': {
        backgroundColor: '#af8e3e',
    },
    [theme.breakpoints.down('md')]: {
        width: '100%',
        alignSelf: 'center',
    },
}));

export default function EventIntroSection({
    heading,
    text, // string or array of strings
    ctaText = "Book online",
    onCtaClick,
    image,
    imageAlt = "Event intro image"
}) {
    const theme = useTheme();

    return (
        <Section>
            <InnerContainer maxWidth="xl">
                {/* Left: Image */}
                <ImageWrapper
                    component={motion.div}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    sx={{ zIndex: 1 }}
                >
                    <StyledImage src={image || "/placeholder.jpg"} alt={imageAlt} />
                </ImageWrapper>

                {/* Right: Content */}
                <ContentWrapper
                    component={motion.div}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    sx={{ zIndex: 1 }}
                >
                    <Heading variant="h2">
                        {heading}
                    </Heading>

                    {Array.isArray(text) ? (
                        text.map((paragraph, idx) => (
                            <Text key={idx}>{paragraph}</Text>
                        ))
                    ) : (
                        <Text>{text}</Text>
                    )}

                    <StyledButton
                        variant="contained"
                        onClick={onCtaClick}
                    >
                        {ctaText}
                    </StyledButton>
                </ContentWrapper>
            </InnerContainer>
        </Section>
    );
}
