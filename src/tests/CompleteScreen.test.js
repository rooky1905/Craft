/* eslint-disable testing-library/prefer-presence-queries */
/* eslint-disable testing-library/prefer-screen-queries */
import { render, waitFor } from "@testing-library/react"
import CompleteScreen from "../components/CompleteScreen"

describe("Complete Screen Component", () => {
    it("testing the loading state", ()=>{
        const {getByText} = render(<CompleteScreen successFun={true} />)
        expect(getByText('Confirmation')).toBeInTheDocument();
        expect(getByText('Order Placed Successfully!')).not.toBeInTheDocument();
        expect(getByText('Sorry your order could not be placed.')).not.toBeInTheDocument();
    })

    it("testing the success state", async ()=>{
        const {getByText} = render(<CompleteScreen successFun={true} />)
        await waitFor(() => {
            expect(getByText('Order Placed Successfully!')).toBeInTheDocument();
          });
    })

    it("testing the failure state", async ()=>{
        const {getByText} = render(<CompleteScreen successFun={false} />)
        await waitFor(() => {
            expect(getByText('Sorry your order could not be placed.')).toBeInTheDocument();
          });
        await waitFor(() => {
            expect(getByText('Retry')).toBeInTheDocument();
          });
    })
})