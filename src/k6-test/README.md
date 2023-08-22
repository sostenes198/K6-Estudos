# K6 Test

## Exemplo de execução dos cenários

```bash
K6_STATSD_ENABLE_TAGS=true k6 run src/k6-test/scenarios/get-healthcheck.js -e ENVIRONMENT='DSV' -e EXECUTOR_TYPE='per-vu-iterations' -e EXECUTOR_PARAMS_PER_VU_ITERATIONS='{"vus":"1", "iterations":"1", "maxDuration":"3h30m"}' -e M2M_TOKEN=''
```

## Descrição dos fluxos de testes:

1. Cenário: `src/k6-test/scenarios/get-healthcheck.js`

    - Chama rota `healthcheck` e valida que a aplicação está saudável