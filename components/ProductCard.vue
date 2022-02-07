<script>
export default {
  functional: true,
  props: {
    product: {
      type: Object,
      default() {
        return {
          image: '',
          name: '',
          description: '',
          price: ''
        }
      }
    },
    removeCard: {
      type: Function
    }
  },
  render: function (h, context) {
    return (
      <div class="product-card" tabIndex="0">
        <button class="product-card__delete-button" on-click={() => context.props.removeCard(context.props.product.id)}/>
        <img src={context.props.product.image} width="100%" height="200" alt={context.props.product.name} />
        <div class="product-card__info">
          <p class="product-card__name">
            {context.props.product.name}
          </p>
          <p class="product-card__description">
            {context.props.product.description}
          </p>
          <p class="product-card__price">
            {context.props.product.price} руб.
          </p>
        </div>
      </div>
      )
    }
  }
</script>

<style scoped lang="scss">

.product-card {
  background-color: #FFFEFB;
  box-shadow: 0px 20px 30px rgba(0, 0, 0, 0.04), 0px 6px 10px rgba(0, 0, 0, 0.02);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  max-width: 332px;
  width: 100%;
  position: relative;
  &:hover {
    transform: scale(1.02);
  }
  img {
    border-radius: 4px 4px 0 0;
    overflow: hidden;
    object-fit: cover;
    max-width: 100%;
  }

  &__delete-button {
    position: absolute;
    border: none;
    display: none;
    cursor: pointer;
    top: -8px;
    right: -8px;
    background-color: #FF8484;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    height: 32px;
    width: 32px;
    background-image: url("../assets/img/delete.png");
    background-repeat: no-repeat;
    background-position: center;
    &:hover {
      background-color: #ff5353;
    }
    .product-card:hover & {
      display: block;
    }
    .product-card:focus & {
      display: block;
    }
    .product-card:focus-within & {
      display: block;
    }
  }

  &__info {
    display: flex;
    flex-direction: column;
    padding: 16px 16px 24px;
    p {
      margin-top: 0;
      color: #3F3F3F;
      max-width: 300px;
    }
  }
  &__name,
  &__description,
  &__price
   {
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &__name {
    font-weight: 600;
    font-size: 20px;
    line-height: 25px;
    margin-bottom: 16px;
    height: 25px;
  }

  &__description {
    font-size: 16px;
    line-height: 20px;
    height: 80px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    margin-bottom: 32px;
  }

  &__price {
    font-weight: 600;
    font-size: 24px;
    line-height: 30px;
    margin-bottom: 0;
    height: 30px;
  }
}

</style>
