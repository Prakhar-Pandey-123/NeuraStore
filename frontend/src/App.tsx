import { Button } from "./components/ui/Button"
import { PlusIcon } from "./icons/PlusIcon"
import { ShareIcon } from "./icons/ShareIcon"


function App() {
  
  return(
    <>
    <Button title="share" size="md" startIcon={<PlusIcon size="md"></PlusIcon>} endIcon={ <ShareIcon size="md"></ShareIcon>} variant="primary"></Button>

     <Button title="add content" size="lg" startIcon={<PlusIcon size="lg"></PlusIcon>} endIcon={<ShareIcon size="lg"></ShareIcon>} variant="secondary"></Button>

     <Button title="add content" size="sm" variant="primary" startIcon={<PlusIcon size="sm"></PlusIcon>} endIcon={<ShareIcon size="sm"></ShareIcon>} ></Button>

    </>
  )
}

export default App
