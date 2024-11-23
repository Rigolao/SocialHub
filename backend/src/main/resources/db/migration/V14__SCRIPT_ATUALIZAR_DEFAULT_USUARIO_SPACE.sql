update `usuario_space` us set us.IS_DEFAULT = 1 where IDUSUARIOSPACE in (select IDUSUARIOSPACE from (
                                                                                                      select IDUSUARIOSPACE , min(DTVINCULO)
                                                                                                      from `usuario_space` us
                                                                                                      where IDCARGO  = 1
                                                                                                      group by IDUSUARIOSPACE
                                                                                                  ) a
)