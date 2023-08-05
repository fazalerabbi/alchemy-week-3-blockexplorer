import BlocksListing from "../components/BlocksListing";
import Container from "../components/Container";

const BlockListingPage = () => {
    return (
        <Container>
            <section class="container-xxl pb-20">
                <BlocksListing />
            </section>
        </Container>
    );
}

export default BlockListingPage;