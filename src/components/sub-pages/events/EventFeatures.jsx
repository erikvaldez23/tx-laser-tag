
import React from 'react';
import { Box, Container, Typography, useTheme, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import GroupsIcon from '@mui/icons-material/Groups';
import BusinessIcon from '@mui/icons-material/Business';
import CelebrationIcon from '@mui/icons-material/Celebration';

// Map string keys to icons
const iconMap = {
    team: GroupsIcon,
    company: BusinessIcon,
    party: CelebrationIcon,
};

const Section = styled(Box)(({ theme, backgroundColor }) => ({
    padding: theme.spacing(8), // Internal padding
    backgroundColor: backgroundColor || '#1B2E40', // Deep dark blue/slate or prop
    color: '#fff',
    [theme.breakpoints.down('md')]: {
        padding: theme.spacing(4),
    },
}));

const InnerContainer = styled(Box)(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: theme.spacing(8),
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
        gridTemplateColumns: '1fr',
        gap: theme.spacing(6),
    },
}));

const Heading = styled(Typography)(({ theme }) => ({
    fontFamily: 'PostNoBillsJaffna, sans-serif', // or Inter slab
    fontWeight: 700,
    fontSize: '2.5rem',
    marginBottom: theme.spacing(6),
    color: '#e2e8f0',
}));

const FeatureList = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(5),
}));

const FeatureItem = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: theme.spacing(3),
    alignItems: 'flex-start',
}));

const IconWrapper = styled(Box)(({ theme }) => ({
    color: '#f2c230', // Gold/Yellow icon color
    marginTop: theme.spacing(0.5),
    '& svg': {
        fontSize: '2rem',
    },
}));

const FeatureContent = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
}));

const FeatureTitle = styled(Typography)(({ theme }) => ({
    fontWeight: 700,
    fontSize: '1.25rem',
    color: '#fff',
}));

const FeatureDesc = styled(Typography)(({ theme }) => ({
    color: '#a0aec0',
    lineHeight: 1.6,
    fontSize: '0.95rem',
}));

const ImageSide = styled(Box)(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.spacing(2),
    overflow: 'hidden',
    boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
    height: '100%',
    minHeight: '400px',
}));

const StyledImage = styled('img')({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
});

export default function EventFeatures({
    heading = "Great for...",
    features = [],
    image,
    backgroundColor
}) {
    return (
        <Container maxWidth="xl" sx={{ mb: 6 }}>
            <Section sx={{ borderRadius: 8 }} backgroundColor={backgroundColor}>
                <InnerContainer>
                    {/* Left: Content */}
                    <Box
                        component={motion.div}
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <Heading variant="h2">{heading}</Heading>

                        <FeatureList>
                            {features.map((feature, idx) => {
                                const Icon = iconMap[feature.icon] || GroupsIcon;
                                return (
                                    <FeatureItem key={idx}>
                                        <IconWrapper>
                                            <Icon />
                                        </IconWrapper>
                                        <FeatureContent>
                                            <FeatureTitle variant="h3">{feature.title}</FeatureTitle>
                                            <FeatureDesc>{feature.description}</FeatureDesc>
                                        </FeatureContent>
                                    </FeatureItem>
                                )
                            })}
                        </FeatureList>
                    </Box>

                    {/* Right: Image */}
                    <ImageSide
                        component={motion.div}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <StyledImage src={image} alt="Event features" />
                    </ImageSide>
                </InnerContainer>
            </Section>
        </Container>
    );
}
