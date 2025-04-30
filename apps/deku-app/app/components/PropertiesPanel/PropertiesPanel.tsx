"use client";
import {
  FiType,
  FiGrid,
  FiSliders,
  FiCode,
  FiInfo,
  FiMinus,
  FiPlus,
  FiChevronDown,
  FiChevronUp,
  FiAlignLeft,
  FiAlignCenter,
  FiAlignRight,
  FiArrowUp,
  FiArrowDown,
} from "react-icons/fi";
import {
  CiAlignLeft,
  CiAlignCenterV,
  CiAlignRight,
  CiAlignTop,
  CiAlignBottom,
  CiAlignCenterH,
} from "react-icons/ci";
import { useState } from "react";
import { useStore } from "../../store/store";

export default function PropertiesPanel() {
  const { showPropertiesPanel } = useStore();
  // Section toggles
  const [layoutOpen, setLayoutOpen] = useState(true);
  const [effectsOpen, setEffectsOpen] = useState(false);
  const [stylesOpen, setStylesOpen] = useState(true);
  const [codeOpen, setCodeOpen] = useState(false);

  if (!showPropertiesPanel) {
    return null;
  }

  return (
    <aside className="w-[320px] bg-[#181A20] border-l border-[#23262F] flex flex-col h-[calc(100vh-3.5rem)] shadow-lg">
      {/* Top icon row */}
      <div className="flex items-center justify-between gap-1 px-4 pt-4 pb-2">
        <button className="p-2 rounded-lg hover:bg-[#23262F] text-[#E5E7EB] text-xl transition">
          <CiAlignLeft />
        </button>
        <button className="p-2 rounded-lg hover:bg-[#23262F] text-[#E5E7EB] text-xl transition">
          <CiAlignCenterH />
        </button>
        <button className="p-2 rounded-lg hover:bg-[#23262F] text-[#E5E7EB] text-xl transition">
          <CiAlignRight />
        </button>
        <button className="p-2 rounded-lg hover:bg-[#23262F] text-[#E5E7EB] text-xl transition">
          <CiAlignTop />
        </button>
        <button className="p-2 rounded-lg hover:bg-[#23262F] text-[#E5E7EB] text-xl transition">
          <CiAlignCenterV />
        </button>
        <button className="p-2 rounded-lg hover:bg-[#23262F] text-[#E5E7EB] text-xl transition">
          <CiAlignBottom />
        </button>
      </div>
      <div className="border-b border-[#23262F] mx-4" />

      <div className="flex-1 overflow-y-auto pb-4">
        {/* Breakpoint Section */}
        <div className="px-4 pt-4 pb-2">
          <div className="flex items-center gap-1 mb-2">
            <span className="text-sm text-[#A1A1AA] font-semibold">
              Breakpoint
            </span>
            <FiInfo className="text-[#6B7280] text-xs" />
          </div>
          <div className="space-y-2">
            {/* Position */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#A1A1AA] w-12">Position</span>
              <div className="flex gap-1">
                <PillInput label="x" />
                <PillInput label="y" />
              </div>
            </div>
            {/* Width */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#A1A1AA] w-12">Width</span>
              <div className="flex gap-1">
                <PillInput label="x" />
                <PillInput label="y" />
              </div>
            </div>
            {/* Height */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#A1A1AA] w-12">Height</span>
              <div className="flex gap-1">
                <PillInput label="x" />
                <PillInput label="y" />
              </div>
            </div>
          </div>
        </div>

        {/* Layout Section */}
        <SectionHeader
          label="Layout"
          open={layoutOpen}
          onToggle={() => setLayoutOpen((v) => !v)}
        />
        {layoutOpen && (
          <div className="px-4 pb-2 space-y-3">
            {/* Type */}
            <div className="flex items-center justify-between gap-2 w-full">
              <span className="text-sm text-[#A1A1AA] max-w-24 w-full">Type</span>
              <div className="flex gap-2 p-1 rounded-lg bg-[#23262F] w-full">
                <ActiveButton active>Stack</ActiveButton>
                <ActiveButton>Grid</ActiveButton>
              </div>
            </div>
            {/* Direction */}
            <div className="flex items-center justify-between gap-2 w-full">
              <span className="text-sm text-[#A1A1AA] max-w-24 w-full">Direction</span>
              <div className="flex gap-2 p-1 rounded-lg bg-[#23262F] w-full">
                <ActiveButton active>
                  <span className="block text-lg">↔</span>
                </ActiveButton>
                <ActiveButton>
                  <span className="block text-lg">↕</span>
                </ActiveButton>
              </div>
            </div>
            {/* Distribute */}
            <div className="flex items-center justify-between gap-2 w-full">
              <span className="text-sm text-[#A1A1AA] max-w-24 w-full">Distribute</span>
              <div className="flex gap-2 p-1 rounded-lg bg-[#23262F] w-full">
                <select className="w-full bg-[#23262F] text-xs text-white rounded-lg border border-[#23262F] py-1 px-2">
                  <option>Start</option>
                  <option>Center</option>
                  <option>End</option>
                </select>
              </div>
            </div>
            {/* Align */}
            <div className="flex items-center justify-between gap-2 w-full">
              <span className="text-sm text-[#A1A1AA] w-24">Align</span>
              <div className="flex gap-2 p-1 rounded-lg bg-[#23262F] w-full">
                <ActiveButton active>
                  <CiAlignLeft className="text-lg" />
                </ActiveButton>
                <ActiveButton>
                  <CiAlignCenterH className="text-lg" />
                </ActiveButton>
                <ActiveButton>
                  <CiAlignRight className="text-lg" />
                </ActiveButton>
              </div>
            </div>
            {/* Wrap */}
            <div className="flex items-center justify-between gap-2 w-full">
              <span className="text-sm text-[#A1A1AA] max-w-24 w-full">Wrap</span>
              <div className="flex gap-2 p-1 rounded-lg bg-[#23262F] w-full">
                <ActiveButton active>Yes</ActiveButton>
                <ActiveButton>No</ActiveButton>
              </div>
            </div>
            {/* Gap */}
            <div className="flex items-center justify-between gap-2 w-full">
              <span className="text-sm text-[#A1A1AA] max-w-24 w-full">Gap</span>
              <div className="flex gap-2 p-1 rounded-lg w-full">
                <input
                  type="number"
                  className="bg-[#23262F] text-xs text-white text-center rounded-lg border border-[#23262F] py-1 px-2 w-12"
                  defaultValue={10}
                />
                <input
                  type="range"
                  min={0}
                  max={100}
                  defaultValue={10}
                  className="flex-1 py-2 accent-[#377DFF]"
                />
              </div>
            </div>
            {/* Padding */}
            <div className="flex items-center justify-between gap-2 w-full">
              <span className="text-sm text-[#A1A1AA] max-w-24 w-full">Padding</span>
              <div className="flex gap-2 p-1 rounded-lg w-full">
                <input
                  type="number"
                  className="bg-[#23262F] text-xs text-white text-center rounded-lg border border-[#23262F] py-1 px-2 w-12"
                  defaultValue={0}
                />
                {/* <button className="bg-[#23262F] text-white rounded-lg border border-[#23262F] px-2 py-1">
                  <span className="block text-xs">□</span>
                </button> */}
                <div className="flex gap-2 p-1 rounded-lg bg-[#23262F] w-full">
                  <ActiveButton>
                    <CiAlignCenterH className="text-lg" />
                  </ActiveButton>
                  <ActiveButton>
                    <CiAlignRight className="text-lg" />
                  </ActiveButton>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Effects Section */}
        <SectionHeader
          label="Effects"
          open={effectsOpen}
          onToggle={() => setEffectsOpen((v) => !v)}
        />
        {effectsOpen && (
          <div className="text-xs text-[#6B7280] px-4 pt-4 pb-2">
            No effects applied.
          </div>
        )}

        {/* Styles Section */}
        <SectionHeader
          label="Styles"
          open={stylesOpen}
          onToggle={() => setStylesOpen((v) => !v)}
        />
        {stylesOpen && (
          <div className="space-y-3 px-4 pt-4 pb-2">
            {/* Fill */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-white border border-[#23262F]" />
              <input
                type="text"
                className="bg-[#23262F] text-xs text-white rounded-lg py-1 px-2 w-24"
                defaultValue="#FFFFFF"
              />
            </div>
            {/* Overflow */}
            <div className="flex items-center gap-2">
              <select className="bg-[#23262F] text-xs text-white rounded-lg py-1 px-2 w-full">
                <option>Hidden</option>
                <option>Visible</option>
                <option>Scroll</option>
              </select>
            </div>
          </div>
        )}

        {/* Code Overrides Section */}
        <SectionHeader
          label="Code Overrides"
          open={codeOpen}
          onToggle={() => setCodeOpen((v) => !v)}
        />
        {codeOpen && (
          <div className="text-xs text-[#6B7280] px-4 pt-4 pb-2">
            No code overrides.
          </div>
        )}
      </div>
    </aside>
  );
}

// Pill input component
function PillInput({ label }: { label: string }) {
  return (
    <div className="flex items-center bg-[#23262F] rounded-lg px-3 py-1 text-xs font-semibold text-white gap-1 min-w-[36px] justify-center">
      0
      <span className="text-[#6B7280] text-[10px] font-normal ml-1">
        {label}
      </span>
    </div>
  );
}

// Section header with info icon and collapse/expand
function SectionHeader({
  label,
  open,
  onToggle,
}: {
  label: string;
  open?: boolean;
  onToggle?: () => void;
}) {
  return (
    <div className="flex items-center justify-between px-4 pt-4 pb-2">
      <div className="flex items-center gap-1">
        <span className="text-sm text-[#A1A1AA] font-semibold tracking-wide">
          {label}
        </span>
        <FiInfo className="text-[#6B7280] text-xs" />
      </div>
      {typeof open === "boolean" && onToggle ? (
        <button onClick={onToggle} className="p-1">
          {open ? (
            <FiMinus className="text-[#6B7280] text-sm" />
          ) : (
            <FiPlus className="text-[#6B7280] text-sm" />
          )}
        </button>
      ) : null}
    </div>
  );
}

// Active/inactive button
function ActiveButton({
  children,
  active,
}: {
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <button
      className={`flex-1 rounded-lg border border-[#23262F] py-2 px-3 text-xs font-medium transition
        ${active ? "bg-[#181A20] text-white" : "bg-[#181A20] text-[#6B7280]"}
      `}
    >
      {children}
    </button>
  );
}
