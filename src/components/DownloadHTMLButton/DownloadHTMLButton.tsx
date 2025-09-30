import { toPng } from 'html-to-image';

import './DownloadHTMLButton.css'
import type { RefObject } from "react";

export type DownloadHTMLButtonProps = {
  refElement: RefObject<HTMLDivElement | undefined> | undefined
  label?: string
  onBefore?: () => any
  fileName?: string
  svg?: any
}

const DownloadHTMLButton = ({ refElement, label = "Download", onBefore, fileName = "results.png", svg }: DownloadHTMLButtonProps) => {

  const handleDownload = async () => {
    if (onBefore) onBefore()
    const element = refElement?.current
    if (element) {
      toPng(element, {
        cacheBust: true
      })
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.download = fileName;
          link.href = dataUrl;
          link.click();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    svg ? <img src={svg} className="icon" alt={label} onClick={handleDownload} /> :
      <input type="button" className="btn btn-normal" value={label} onClick={handleDownload} />
  )
}

export default DownloadHTMLButton
