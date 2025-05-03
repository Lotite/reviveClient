import style from "./GlitchStyle.module.css"

interface GlitchTextProps {
    text: string;
    className?: string;
    color?: string;
    fontSize?: string;
    animationDuration?: string;
}

export default function GlitchText({text, className, color = '#fff', fontSize = '3em', animationDuration = '1s'}: GlitchTextProps){
    const styleVars = {
        '--glitch-color': color,
        '--glitch-font-size': fontSize,
        '--glitch-animation-duration': animationDuration,
    } as React.CSSProperties;

    return <span data-text={text} className={`${style.glitch} ${className}`} style={styleVars}>
        {text}
    </span>
}
