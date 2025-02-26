    import { ImageSourcePropType } from "react-native";

    export type ImageSliderType = {
        title: string;
        image: ImageSourcePropType;
        description: string;
    }


    export const ImageSlider = [
        {
            title: 'Sancocho',
            image: require('../assets/sancocho.webp'),
            description: 'Sancocho Colombiano'
        },
        {
            title: 'Calzone',
            image: require('../assets/calzone.webp'),
            description: 'Calzone Colombiano'
        },
        {
            title: 'Sandwich',
            image: require('../assets/cubano.webp'),
            description: 'Sandwich Cubano'
        }
    ]