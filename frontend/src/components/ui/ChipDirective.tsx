import {cn} from "../../lib/utils";
const ChipDirective = ({text, cssClass}:{string, string}) => {
  return (
    <div className={cn("rounded-xl", cssClass)}>
      {text}
    </div>
  )
}

export default ChipDirective
