import { NextPage } from "next";
import {
    DetailedHTMLProps,
    ImgHTMLAttributes,
    useState,
    useEffect,
} from "react";

import css from "./job.module.css";

export interface JobImageProps
    extends DetailedHTMLProps<
    ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
    > {
    size: number;
}

export const JobImage: NextPage<JobImageProps> = ({ size, ...props }) => {
    const [loaded, setLoaded] = useState(false);
    const [hydrated, setHydrated] = useState(false);
    useEffect(() => {
        setHydrated(true);
    }, []);
    const shouldDisplay = loaded ? "block" : "none";
    const containerStyle = {
        height: size,
        width: size,
    };
    const placeholderStyle = {
        ...containerStyle,
        fontSize: `${size * (1 / 5)}px`,
        lineHeight: `${size}px`,
    };
    return (
        <div className={css["image-container"]} style={containerStyle}>
            {!loaded && (
                <div className={css["image-placeholder"]} style={placeholderStyle}>
                    not found
                </div>
            )}
            {hydrated && (
                // eslint-disable-next-line @next/next/no-img-element
                <img  {...props} style={{ display: shouldDisplay }} onLoad={() => setLoaded(true)} alt="" />
            )}
        </div>
    );
};