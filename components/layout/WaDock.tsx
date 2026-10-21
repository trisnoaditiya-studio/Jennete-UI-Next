import { WaIcon } from "@/components/brand-icons";
import { WA_URL } from "@/lib/site";

/* tombol WhatsApp mengambang → membuka widget (data-open="resv") */
export default function WaDock() {
  return (
    <div className="wa-dock">
      <a className="wa" href={WA_URL} data-open="resv" aria-haspopup="dialog" aria-label="Hubungi lewat WhatsApp">
        <WaIcon />
        <span>WhatsApp</span>
      </a>
    </div>
  );
}
