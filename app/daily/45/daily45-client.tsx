"use client";

import Link from "next/link";
import { useEffect } from "react";
import styles from "../daily-lesson.module.css";

const aggregateExampleSnippet = `Order
- Items
- Payments`;

const goodChangesSnippet = `Order.AddItem()
Order.Pay()
Order.RemoveItem()`;

const badChangesSnippet = `Modificar OrderItem directamente
Agregar Payment desde fuera
Cambiar Status libremente`;

const crossRulesSnippet = `- no puedes pagar un pedido sin items
- no puedes modificar items despues de pagar
- no puedes dejar un pedido vacio
- el total debe coincidir con los items`;

const orderAggregateSnippet = `public class Order
{
    private readonly List<OrderItem> _items = new();
    private readonly List<Payment> _payments = new();

    public Guid Id { get; private set; }
    public OrderStatus Status { get; private set; }
    public IReadOnlyCollection<OrderItem> Items => _items.AsReadOnly();
    public IReadOnlyCollection<Payment> Payments => _payments.AsReadOnly();
    public decimal Total => _items.Sum(x => x.Subtotal);

    private Order()
    {
    }

    public Order(Guid id)
    {
        Id = id;
        Status = OrderStatus.Draft;
    }

    public void AddItem(Guid productId, int quantity, decimal unitPrice)
    {
        if (Status != OrderStatus.Draft)
            throw new InvalidOperationException("Solo se pueden agregar productos a pedidos en borrador.");

        if (quantity <= 0)
            throw new ArgumentException("La cantidad debe ser mayor que cero.");

        if (unitPrice < 0)
            throw new ArgumentException("El precio no puede ser negativo.");

        var existingItem = _items.FirstOrDefault(x => x.ProductId == productId);

        if (existingItem is null)
        {
            _items.Add(new OrderItem(productId, quantity, unitPrice));
        }
        else
        {
            existingItem.IncreaseQuantity(quantity);
        }
    }

    public void RemoveItem(Guid productId)
    {
        if (Status != OrderStatus.Draft)
            throw new InvalidOperationException("No se pueden eliminar productos de un pedido no editable.");

        var item = _items.FirstOrDefault(x => x.ProductId == productId);
        if (item is null)
            throw new InvalidOperationException("El producto no existe en el pedido.");

        _items.Remove(item);

        if (_items.Count == 0)
            throw new InvalidOperationException("Un pedido no puede quedarse sin productos.");
    }

    public void Confirm()
    {
        if (_items.Count == 0)
            throw new InvalidOperationException("No se puede confirmar un pedido sin productos.");

        if (Status != OrderStatus.Draft)
            throw new InvalidOperationException("Solo los pedidos en borrador pueden confirmarse.");

        Status = OrderStatus.Confirmed;
    }

    public void Pay(decimal amount)
    {
        if (Status != OrderStatus.Confirmed)
            throw new InvalidOperationException("Solo se pueden pagar pedidos confirmados.");

        if (amount <= 0)
            throw new ArgumentException("El monto debe ser mayor que cero.");

        if (amount != Total)
            throw new InvalidOperationException("El monto pagado debe coincidir con el total del pedido.");

        _payments.Add(new Payment(amount, DateTime.UtcNow));
        Status = OrderStatus.Paid;
    }
}`;

const orderItemSnippet = `public class OrderItem
{
    public Guid ProductId { get; private set; }
    public int Quantity { get; private set; }
    public decimal UnitPrice { get; private set; }
    public decimal Subtotal => Quantity * UnitPrice;

    private OrderItem()
    {
    }

    internal OrderItem(Guid productId, int quantity, decimal unitPrice)
    {
        if (quantity <= 0)
            throw new ArgumentException("La cantidad debe ser mayor que cero.");

        if (unitPrice < 0)
            throw new ArgumentException("El precio no puede ser negativo.");

        ProductId = productId;
        Quantity = quantity;
        UnitPrice = unitPrice;
    }

    internal void IncreaseQuantity(int quantity)
    {
        if (quantity <= 0)
            throw new ArgumentException("La cantidad a incrementar debe ser mayor que cero.");

        Quantity += quantity;
    }
}`;

const paymentSnippet = `public class Payment
{
    public decimal Amount { get; private set; }
    public DateTime PaidAtUtc { get; private set; }

    private Payment()
    {
    }

    internal Payment(decimal amount, DateTime paidAtUtc)
    {
        if (amount <= 0)
            throw new ArgumentException("El monto debe ser mayor que cero.");

        Amount = amount;
        PaidAtUtc = paidAtUtc;
    }
}`;

const orderStatusSnippet = `public enum OrderStatus
{
    Draft = 1,
    Confirmed = 2,
    Paid = 3
}`;

const weakAggregateSnippet = `public class Order
{
    public List<OrderItem> Items { get; set; } = [];
    public List<Payment> Payments { get; set; } = [];
    public OrderStatus Status { get; set; }
}`;

const weakUsageSnippet = `order.Items.Add(...)
order.Status = OrderStatus.Paid
order.Payments.Clear()`;

const orderServiceSnippet = `public class OrderService
{
    private readonly IOrderRepository _orderRepository;

    public OrderService(IOrderRepository orderRepository)
    {
        _orderRepository = orderRepository;
    }

    public async Task AddItemAsync(Guid orderId, Guid productId, int quantity, decimal unitPrice)
    {
        var order = await _orderRepository.GetByIdAsync(orderId);

        if (order is null)
            throw new InvalidOperationException("Pedido no encontrado.");

        order.AddItem(productId, quantity, unitPrice);

        await _orderRepository.SaveAsync(order);
    }

    public async Task PayAsync(Guid orderId, decimal amount)
    {
        var order = await _orderRepository.GetByIdAsync(orderId);

        if (order is null)
            throw new InvalidOperationException("Pedido no encontrado.");

        order.Pay(amount);

        await _orderRepository.SaveAsync(order);
    }
}`;

const efMentalSnippet = `DB -> cargar Order con Items y Payments
Service -> order.AddItem() / order.Pay()
DB -> guardar Order`;

const keyQuestionsSnippet = `Puedo hacer esto desde fuera?
order.Items.Add(...)
order.Status = OrderStatus.Paid
order.Payments.Clear()`;

const goodPathSnippet = `Order.AddItem(...)
Order.RemoveItem(...)
Order.Confirm()
Order.Pay(...)`;

const miniRulesSnippet = `- no pagar sin items
- no confirmar vacio
- no modificar despues de pagar`;

export default function Daily45Client() {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/44";
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className={styles.page}>
      <header className={styles.topbar}>
        <div className={styles.topbarInner}>
          <div className={styles.brand}>
            <div className={styles.logo} aria-hidden="true" />
            <div>
              <h1>Daily Backend</h1>
              <div className={styles.brandSub}>1 leccion al dia • aprendizaje visible • criterio real</div>
            </div>
          </div>

          <nav className={styles.nav} aria-label="Navegacion">
            <Link className={styles.pill} href="/daily">
              Archivo
            </Link>
            <Link className={styles.pill} href="/">
              Sobre mi
            </Link>
          </nav>

          <div className={styles.actions}>
            <Link className={styles.btn} href="/daily/44">
              <span className={styles.kbd}>←</span> Clase anterior
            </Link>
          </div>
        </div>
      </header>

      <main className={styles.container}>
        <div className={styles.grid}>
          <article className={styles.card}>
            <div className={styles.bd}>
              <div className={styles.dailyHero}>
                <div className={styles.createdAt}>15/04/2026</div>
                <div className={styles.badge}>Daily #45 • Backend Foundations</div>
                <h2 className={styles.title}>Aggregates: proteger consistencia en grupos de entidades</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>8-14 min</span>
                  <span className={styles.chip}>Nivel: Intermedio</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: DDD</span>
                  <span className={styles.chip}>Tag: Aggregate Root</span>
                  <span className={styles.chip}>Tag: .NET</span>
                </div>

                <p className={styles.lead}>
                  Un Aggregate agrupa entidades relacionadas y garantiza consistencia a traves de una unica puerta de
                  entrada: el Aggregate Root.
                </p>
              </div>

              <section className={styles.section} id="idea">
                <div className={styles.shd}>
                  <div>
                    <h3>1. La idea clave</h3>
                    <p className={styles.sub}>Un grupo consistente con una raiz que controla los cambios.</p>
                  </div>
                  <span className={styles.chip}>Concepto</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.callout}>Todo cambio importante debe pasar por el Aggregate Root.</div>
                </div>
              </section>

              <section className={styles.section} id="ejemplo-simple">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Ejemplo simple</h3>
                    <p className={styles.sub}>Order + Items + Payments como conjunto consistente.</p>
                  </div>
                  <span className={styles.chip}>Escenario</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{aggregateExampleSnippet}</pre>
                  <p>Buenas operaciones:</p>
                  <pre>{goodChangesSnippet}</pre>
                  <p>Malas operaciones:</p>
                  <pre>{badChangesSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="problema">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Que problema resuelve</h3>
                    <p className={styles.sub}>Reglas cruzadas entre varias entidades.</p>
                  </div>
                  <span className={styles.chip}>Consistencia</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{crossRulesSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="mindset">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Como piensa un backend developer</h3>
                    <p className={styles.sub}>Detecta datos que deben cambiar juntos y protegerse juntos.</p>
                  </div>
                  <span className={styles.chip}>Mentalidad</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Que datos deben cambiar juntos?</li>
                    <li>Que reglas afectan a varias entidades a la vez?</li>
                    <li>Donde centralizo esa consistencia?</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="dotnet-real">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Como se implementa en .NET, de verdad</h3>
                    <p className={styles.sub}>Raiz, colecciones privadas, metodos con intencion y reglas internas.</p>
                  </div>
                  <span className={styles.chip}>Implementacion</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Aggregate Root: Order</h4>
                  <pre>{orderAggregateSnippet}</pre>

                  <h4>Entidad interna: OrderItem</h4>
                  <pre>{orderItemSnippet}</pre>

                  <h4>Entidad interna: Payment</h4>
                  <pre>{paymentSnippet}</pre>

                  <h4>Estado: OrderStatus</h4>
                  <pre>{orderStatusSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="why-real-aggregate">
                <div className={styles.shd}>
                  <div>
                    <h3>6. Que lo hace un Aggregate de verdad</h3>
                    <p className={styles.sub}>No es cantidad de clases, es control de consistencia por la raiz.</p>
                  </div>
                  <span className={styles.chip}>Arquitectura</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Colecciones privadas.</li>
                    <li>Exposicion de solo lectura.</li>
                    <li>Metodos con intencion de negocio.</li>
                    <li>Invariantes en la raiz.</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="weak-design">
                <div className={styles.shd}>
                  <div>
                    <h3>7. Que NO es un aggregate bien hecho</h3>
                    <p className={styles.sub}>Estado mutable libremente desde fuera.</p>
                  </div>
                  <span className={styles.chip}>Antipatron</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{weakAggregateSnippet}</pre>
                  <p>Con ese diseño podrias hacer:</p>
                  <pre>{weakUsageSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="service-usage">
                <div className={styles.shd}>
                  <div>
                    <h3>8. Como se usa desde un Service</h3>
                    <p className={styles.sub}>El service coordina; no muta internals del aggregate.</p>
                  </div>
                  <span className={styles.chip}>Aplicacion</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{orderServiceSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="ef-core">
                <div className={styles.shd}>
                  <div>
                    <h3>9. Como se ve mentalmente con EF Core</h3>
                    <p className={styles.sub}>Cargas la raiz con hijos, modificas por raiz y guardas como unidad.</p>
                  </div>
                  <span className={styles.chip}>Persistencia</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{efMentalSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="self-check">
                <div className={styles.shd}>
                  <div>
                    <h3>10. Regla practica de implementacion</h3>
                    <p className={styles.sub}>Si puedes romper desde fuera, no esta bien modelado.</p>
                  </div>
                  <span className={styles.chip}>Checklist</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{keyQuestionsSnippet}</pre>
                  <p>Flujo correcto esperado:</p>
                  <pre>{goodPathSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="relation">
                <div className={styles.shd}>
                  <div>
                    <h3>11. Relacion con dias anteriores</h3>
                    <p className={styles.sub}>Invariantes + entidades ricas + value objects convergen aqui.</p>
                  </div>
                  <span className={styles.chip}>Contexto</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Dia 42: invariantes.</li>
                    <li>Dia 43: entidades ricas.</li>
                    <li>Dia 44: value objects.</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="testing">
                <div className={styles.shd}>
                  <div>
                    <h3>12. Como lo detectas como tester</h3>
                    <p className={styles.sub}>Buscas ruptura de reglas cruzadas y estados imposibles.</p>
                  </div>
                  <span className={styles.chip}>Testing</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Intentar pagar sin items.</li>
                    <li>Intentar modificar items despues de pagar.</li>
                    <li>Intentar dejar pedido vacio.</li>
                    <li>Intentar forzar cambios internos fuera de la raiz.</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="takeaway">
                <div className={styles.shd}>
                  <div>
                    <h3>Idea que te llevas hoy</h3>
                    <p className={styles.sub}>Un aggregate garantiza consistencia agrupando entidades bajo una raiz.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>Cierre</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.quote}>Todo cambio importante pasa por el Aggregate Root.</div>
                </div>
              </section>

              <section className={styles.section} id="mini-project">
                <div className={styles.shd}>
                  <div>
                    <h3>Mini-proyecto (5-10 min)</h3>
                    <p className={styles.sub}>Detectar e implementar un aggregate en un caso real.</p>
                  </div>
                  <span className={styles.chip}>Practica</span>
                </div>
                <div className={styles.sbd}>
                  <p>Estructura base:</p>
                  <pre>{aggregateExampleSnippet}</pre>

                  <p>Paso 1: decide si cambian por separado o como conjunto.</p>
                  <p>Paso 2: define la raiz del aggregate (Order).</p>
                  <p>Paso 3: define reglas del conjunto.</p>
                  <pre>{miniRulesSnippet}</pre>

                  <p>Paso 4: traducelo a metodos con intencion:</p>
                  <pre>{goodPathSnippet}</pre>

                  <div className={styles.footerNav}>
                    <Link className={styles.btn} href="/daily">
                      Ver archivo
                    </Link>
                  </div>
                </div>
              </section>
            </div>
          </article>

          <aside className={styles.sidebar}>
            <div className={styles.card}>
              <div className={styles.hd}>
                <div>
                  <h2>Resumen rapido</h2>
                  <p>Dia 45 en una vista.</p>
                </div>
              </div>
              <div className={styles.bd}>
                <div className={styles.li}>
                  <strong>Idea clave:</strong> consistencia de grupo bajo una raiz.
                </div>
                <div className={styles.li}>
                  <strong>.NET real:</strong> colecciones privadas y metodos con intencion.
                </div>
                <div className={styles.li}>
                  <strong>Practica:</strong> verificar que no se pueda mutar desde fuera.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
