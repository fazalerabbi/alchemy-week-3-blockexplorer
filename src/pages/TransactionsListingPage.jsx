import Container from "../components/Container";
import TransactionsListing from "../components/TransactionsListing";

const TransactionsListingPage = () => {
    return (
        <Container>
            <section class="container-xxl pb-20">
                <TransactionsListing />
            </section>
        </Container>
    );
}

export default TransactionsListingPage;