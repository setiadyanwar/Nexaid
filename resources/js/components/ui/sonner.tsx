import { useTheme } from "next-themes"
import { Toaster as Sonner, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme } = useTheme();  // Mendapatkan tema dari useTheme

  // Cek dan sesuaikan pengaturan tema
  const toastTheme = theme === "dark" ? "dark" : "light"; 

  return (
    <Sonner
      theme={toastTheme as ToasterProps["theme"]}
      className="toaster group"
      style={{
        "--normal-bg": "var(--popover)",
        "--normal-text": "var(--popover-foreground)",
        "--normal-border": "var(--border)",
      } as React.CSSProperties}
      {...props}
    />
  )
}

export { Toaster }
