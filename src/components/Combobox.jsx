import { useEffect, useId, useMemo, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

/**
 * Text input with a dropdown list. Clicking shows every option; typing filters it.
 * Any typed value is accepted, so people can enter a place that isn't listed.
 */
export default function Combobox({ value, onChange, options, placeholder, required, className = "", name }) {
  const [open, setOpen] = useState(false);
  const [typed, setTyped] = useState(false); // filter only after the user starts typing
  const [active, setActive] = useState(0);
  const box = useRef(null);
  const list = useRef(null);
  const id = useId();

  const shown = useMemo(() => {
    const q = (value || "").trim().toLowerCase();
    if (!typed || !q) return options;
    const starts = options.filter((o) => o.toLowerCase().startsWith(q));
    const has = options.filter((o) => !o.toLowerCase().startsWith(q) && o.toLowerCase().includes(q));
    return [...starts, ...has];
  }, [options, value, typed]);

  useEffect(() => {
    const close = (e) => box.current && !box.current.contains(e.target) && setOpen(false);
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  useEffect(() => {
    if (!open || !list.current) return;
    const el = list.current.children[active];
    if (el) el.scrollIntoView({ block: "nearest" });
  }, [active, open]);

  const pick = (o) => { onChange(o); setOpen(false); setTyped(false); };

  const onKey = (e) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setOpen(true); setActive((a) => Math.min(a + 1, shown.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
    else if (e.key === "Enter" && open && shown[active]) { e.preventDefault(); pick(shown[active]); }
    else if (e.key === "Escape" || e.key === "Tab") setOpen(false);
  };

  return (
    <div ref={box} className={`relative ${className}`}>
      <input
        type="text"
        name={name}
        role="combobox"
        aria-expanded={open}
        aria-controls={id}
        aria-autocomplete="list"
        autoComplete="off"
        placeholder={placeholder}
        required={required}
        value={value}
        onFocus={() => { setOpen(true); setTyped(false); setActive(0); }}
        onClick={() => setOpen(true)}
        onChange={(e) => { onChange(e.target.value); setTyped(true); setOpen(true); setActive(0); }}
        onKeyDown={onKey}
        className="w-full border rounded px-3 py-2 pr-9"
      />
      <ChevronDown
        size={16}
        aria-hidden
        className={`absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none transition-transform ${open ? "rotate-180" : ""}`}
      />
      {open && shown.length > 0 && (
        <ul
          ref={list}
          id={id}
          role="listbox"
          className="absolute z-30 left-0 right-0 mt-1 max-h-60 overflow-auto bg-white border border-gray-300 shadow-lg text-left"
        >
          {shown.map((o, i) => (
            <li
              key={o}
              role="option"
              aria-selected={o === value}
              onMouseDown={(e) => { e.preventDefault(); pick(o); }}
              onMouseEnter={() => setActive(i)}
              className={`px-3 py-2 cursor-pointer text-sm ${i === active ? "bg-black text-white" : o === value ? "bg-gray-100" : ""}`}
            >
              {o}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
