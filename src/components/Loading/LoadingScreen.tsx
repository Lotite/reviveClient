import { useState, useEffect } from "react"
import Dialog from "../Dialog/Dialog"
import styles from "./LoadingScreen.module.css"
import { useLoading } from "../../contexts/LoadingContext"


export default function LoadingScreen() {
  const { isLoading } = useLoading()
  const [signalBars, setSignalBars] = useState(0)
  const [direction, setDirection] = useState(1)
  const [isVisible, setIsVisible] = useState(true)
  const [isFadingOut, setIsFadingOut] = useState(false)
  const [display, setDisplay] = useState<"flex"|"hidden">("flex")
  useEffect(() => {
    const interval = setInterval(() => {
      setSignalBars((prev) => {
        const newValue = prev + direction

        if (newValue >= 5) {
          setDirection(-1)
          return 5
        } else if (newValue <= 0) {
          setDirection(1)
          return 0
        }

        return newValue
      })
    }, 400)

    return () => clearInterval(interval)
  }, [direction])

  useEffect(() => {
    if (!isLoading && isVisible) {
      setIsFadingOut(true)
      const timer = setTimeout(() => {
        setDisplay("hidden")
        setIsVisible(false)
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [isLoading, isVisible])

  if (!isVisible) {
    return null
  }

  return (
    <Dialog
      display={display}
      backgrounColor="dark"
      classContainer="w-full h-full flex items-center justify-center"
      constainerHeight="100vh"
      constainerWidth="100vw"
    >
      <div
        className={`relative flex items-center justify-center min-h-screen ${
          isFadingOut ? styles.loadingContainerFadeOut : styles.loadingContainer
        }`}
      >
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-3xl scale-110 opacity-60"></div>

          <div className="relative w-[500px] h-[300px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-3 shadow-2xl border border-slate-700/50">
            <div className="relative w-full h-full bg-black rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent rounded-2xl"></div>

              <div
                className={`absolute inset-0 opacity-15 ${styles.noisePattern}`}
                style={{
                  backgroundImage: `
                    radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 1px, transparent 1px),
                    radial-gradient(circle at 75% 75%, rgba(255,255,255,0.05) 1px, transparent 1px)
                  `,
                  backgroundSize: "20px 20px, 30px 30px",
                }}
              ></div>

              <div className="absolute inset-0 flex flex-col items-center justify-center space-y-8">
                <div className="relative">
                  <div className="flex items-end space-x-2 p-4 bg-black/30 backdrop-blur-md rounded-xl border border-white/10 transition-colors duration-500 ease-in-out">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-4 rounded-t-lg transition-all duration-700 ease-in-out ${
                          i < signalBars
                            ? "bg-gradient-to-t from-emerald-600 to-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.6)]"
                            : "bg-slate-700/50"
                        }`}
                        style={{
                          height: `${20 + i * 8}px`,
                          transition: "background-color 0.5s ease, box-shadow 0.7s ease, opacity 0.5s ease",
                          opacity: i < signalBars ? "1" : "0.6",
                        }}
                      />
                    ))}
                  </div>

                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                    <div className="text-emerald-400 text-sm font-mono bg-black/50 px-2 py-1 rounded">
                      {signalBars}/5
                    </div>
                  </div>
                </div>

                <div className="text-center space-y-4">
                  <div className="text-white text-3xl font-extralight tracking-[0.4em] opacity-90">CARGANDO</div>
                </div>
              </div>

              <div
                className="absolute inset-0 pointer-events-none opacity-5"
                style={{
                  background: `repeating-linear-gradient(
                    0deg,
                    transparent 0px,
                    rgba(255,255,255,0.1) 1px,
                    transparent 2px
                  )`,
                }}
              />

              <div
                className="absolute inset-0 pointer-events-none opacity-20"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 30%)",
                }}
              />
            </div>

            <div className="absolute bottom-3 right-4 text-slate-400 text-xs font-light tracking-wider opacity-70">
              REVIVE
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  )
}
