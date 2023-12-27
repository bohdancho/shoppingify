import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '~/../tailwind.config.ts'

const fullTailwindConfig = resolveConfig(tailwindConfig)
export const isMdScreen = () => matchMedia(`(min-width: ${fullTailwindConfig.theme.screens.lg})`).matches
