import { Switch } from "@chakra-ui/react";

interface SwitchInputProps {
  label: string;
  checked: boolean;
  onCheckedChange: (e: { checked: boolean }) => void;
}

export default function SwitchInput({
  label,
  checked,
  onCheckedChange,
}: SwitchInputProps) {
  return (
    <div className="text-center mt-5">
      <p className="mb-1">{label}</p>
      <Switch.Root
        suppressHydrationWarning
        checked={checked}
        colorPalette="blue"
        onCheckedChange={onCheckedChange}
      >
        <Switch.HiddenInput />
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
        <Switch.Label />
      </Switch.Root>
    </div>
  );
}
