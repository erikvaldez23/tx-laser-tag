
import React from 'react';
import { Box, Container, Typography, Button, useTheme, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';

const HeroSection = styled(Box)(({ theme, bgImage, bgPosition }) => ({
    position: 'relative',
    width: '100%',
    minHeight: '600px',
    backgroundImage: `url(${bgImage})`,
    backgroundSize: 'cover',
    backgroundPosition: bgPosition || 'center',
    display: 'flex',
    alignItems: 'flex-end', // Align content to the bottom
    paddingBottom: theme.spacing(6),
    zIndex: 1,
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%)',
        zIndex: 0,
    },
    [theme.breakpoints.down('md')]: {
        minHeight: '500px',
        paddingBottom: theme.spacing(4),
    },
}));

const ContentBox = styled(Box)(({ theme, contentBg }) => ({
    position: 'relative', // Ensure it's above the overlay
    zIndex: 2,
    backgroundColor: contentBg || '#1a202c', // Use prop or default dark blue
    color: '#fff',
    padding: theme.spacing(6),
    // maxWidth: '1200px', // Removed by user
    margin: '0 auto',
    marginBottom: theme.spacing(-12), // Bleed effect
    display: 'grid',
    gridTemplateColumns: '1fr 1.5fr', // Title left, Text right
    gap: theme.spacing(6),
    alignItems: 'center',
    borderRadius: theme.spacing(0), // Sharp corners as per design (or slight radius if preferred)
    boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
    [theme.breakpoints.down('md')]: {
        gridTemplateColumns: '1fr',
        padding: theme.spacing(4),
        gap: theme.spacing(3),
        width: '100%',
        marginBottom: theme.spacing(-8),
    },
}));

const StencilTitle = styled(Typography)(({ theme }) => ({
    fontFamily: 'PostNoBillsJaffna, sans-serif',
    fontSize: 'clamp(3rem, 5vw, 5rem)',
    lineHeight: 0.9,
    fontWeight: 800,
    textTransform: 'uppercase',
    color: '#fff',
    letterSpacing: '0.05em',
    // Make the font look "stenciled" or distressed if possible with CSS, 
    // but usually relies on the font file itself.
}));

const DescriptionText = styled(Typography)(({ theme }) => ({
    fontSize: '1.1rem',
    lineHeight: 1.6,
    marginBottom: theme.spacing(3),
    color: '#e2e8f0',
}));

const StyledButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#bfbfbf', // Light gray button
    color: '#000',
    textTransform: 'none',
    fontSize: '1rem',
    fontWeight: 600,
    padding: '12px 32px',
    borderRadius: '4px',
    fontFamily: 'Inter, sans-serif', // Assuming serif from design, or Inter
    '&:hover': {
        backgroundColor: '#a6a6a6',
    },
    [theme.breakpoints.down('md')]: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center', // clean way to ensure text is centered, though default for button
    },
}));

export default function EventSubHero({
    title,
    description,
    ctaText = "Book online",
    onCtaClick,
    image,
    contentBg,
    bgPosition
}) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    // Split title by words or just render it
    // The screenshot has "CORPORATE" on one line, "EVENTS" on next.
    // simpler to let caller pass strings or breaks, 
    // but here we can just let flex/grid handle wrapping or explicit <br/>

    return (
        <HeroSection bgImage={image} bgPosition={bgPosition}>
            <Container maxWidth="xl">
                <ContentBox
                    contentBg={contentBg}
                    component={motion.div}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Left Side: Title */}
                    <Box>
                        <StencilTitle variant="h1">
                            {title}
                        </StencilTitle>
                    </Box>

                    {/* Right Side: Description + CTA */}
                    <Box>
                        <DescriptionText variant="body1">
                            {description}
                        </DescriptionText>
                        <StyledButton
                            variant="contained"
                            onClick={onCtaClick}
                        >
                            {ctaText}
                        </StyledButton>
                    </Box>
                </ContentBox>
            </Container>
        </HeroSection>
    );
}
