import * as React from "react"
import { HexColorPicker, HexColorInput } from "react-colorful"
import { cn } from "@/lib/utils"

interface ColorPickerProps {
  color: string
  onChange: (color: string) => void
  className?: string
}

const ColorPicker = React.forwardRef<HTMLDivElement, ColorPickerProps>(
  ({ color, onChange, className }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false)

    return (
      <div className={cn("relative", className)} ref={ref}>
        <div
          className="h-10 w-10 rounded-md border cursor-pointer"
          style={{ backgroundColor: color }}
          onClick={() => setIsOpen(!isOpen)}
        />
        {isOpen && (
          <div className="absolute left-0 top-12 z-50 rounded-md border bg-popover p-3 shadow-md">
            <HexColorPicker color={color} onChange={onChange} />
            <div className="mt-2 flex items-center gap-2">
              <div
                className="h-8 w-8 rounded-md border"
                style={{ backgroundColor: color }}
              />
              <HexColorInput
                color={color}
                onChange={onChange}
                className="h-8 w-24 rounded-md border bg-background px-2 text-sm"
                prefixed
              />
            </div>
          </div>
        )}
      </div>
    )
  }
)
ColorPicker.displayName = "ColorPicker"

export { ColorPicker } 