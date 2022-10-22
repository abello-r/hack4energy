from ast import main
import sys


def factor_uso(tamaño_hogar):
    assert tamaño_hogar > 0
    if tamaño_hogar == 1:
        return (1)
    if tamaño_hogar == 2:
        return (1.1)
    if tamaño_hogar == 3 or tamaño_hogar == 4:
        return (1.2)
    else:
        return (1.3)


def factor_uso_lineal(tamaño_hogar):
    assert tamaño_hogar > 0
    if tamaño_hogar == 1:
        return (1)
    if tamaño_hogar == 2:
        return (2)
    if tamaño_hogar == 3 or tamaño_hogar == 4:
        return (3)
    else:
        return (4)


def consumo_mensual():
    """
    Recibe el formulario y devuelve un float con el consumo mensual del usuario en KWh
    """
    if not int(sys.argv[1]) and not int(sys.argv[2]) and not int(sys.argv[3]) and not int(sys.argv[4]) and not int(sys.argv[5]) and not int(sys.argv[6]) and not int(sys.argv[7]) and not int(sys.argv[8]):
        return (0, 0)
    response = {
        "n_personas": sys.argv[1],
        "tipo_lavadora": str(sys.argv[2]),
        "tipo_frigorifico": str(sys.argv[3]),
        "tipo_tv": str(sys.argv[4]),
        "ac": str(sys.argv[5]),
        "calefaccion": str(sys.argv[6]),
        "tipo_termo": str(sys.argv[7]),
        "n_compania": str(sys.argv[8])
    }
    # valores
    consumo_ac = {
        "portatil": 0.9,
        "normal": 0.65,
        "no": 0,
        "0": 0
    }

    compania = {
        "Endesa": 0.16,
        "Naturgy": 0.16,
        "Iberdrola": 0.17,
        "0": 0
    }

    consumo_calefaccion = {
        "radiador": 1,
        "caldera": 1.5,
        "bomba_calor": 2.5,
        "calefactor_portatil": 2,
        "no": 0,
        "0" : 0
    }

    consumo_frigorifico = {
        "a+++": 14.5,
        "a++": 23.5,
        "a+": 26.75,
        "a": 31,
        "b": 42.25,
        "c": 53.75,
        "0": 0
    }

    consumo_cocina = {
        "vitroceramica": 41.1,
        "induccion": 37.6,
        "gas": 0,
        "0": 0
    }

    consumo_tv = {
        "a": 10.3125,
        "a+": 6.875,
        "a++": 4.125,
        "0": 0
    }

    consumo_lavadora = {
        # creo que estan mal
        "0": 0,
        "a+++": 0.664,
        "a++": 0.852,
        "a+": 0.956,
        "a": 1.192,
        "b": 1.35,
    }

    consumo_termo = {
        "100l": 206.59,
        "80l": 164.25,
        "50l": 109.5,
        "30l": 66.92,
        "gas": 0,
        "0": 0
    }

    consumo_plancha = 40
    consumo_aspiradora = 40
    consumo_campana = 2.74
    consumo_secadora = 15.76
    consumo_congelador = 18
    consumo_lavavajillas = 13.2
    consumo_microondas = 4.5
    consumo_horno = 14.16
    consumo_km_coche = 0.17
    consumo_iluminacion = 11.74

    f_uso = factor_uso(float(sys.argv[1]))
    f_uso_lineal = factor_uso_lineal(float(sys.argv[1]))

    consumos_fijos = 0
    consumos_variables_lineales = 0
    consumos_variables_factor_uso = 0

    # fijos: gastan lo mismo independientemente del n de personas en la familia
    consumos_fijos += consumo_frigorifico[response["tipo_frigorifico"]]

    # variables_lineales: cambian linealmente en funcion de n de personas
    consumos_variables_lineales += consumo_iluminacion

    # variables_factor_uso: tienen un incremento marginal en funcion de n de personas
    consumos_variables_factor_uso += consumo_termo[response["tipo_termo"]]
    consumos_variables_factor_uso += consumo_lavadora[response["tipo_lavadora"]]
    consumos_variables_factor_uso += consumo_tv[response["tipo_tv"]]

    # gastos fijos pero que necesitan input
    consumos_fijos += consumo_ac[response["ac"]] * 1
    consumos_fijos += consumo_calefaccion[response["calefaccion"]] * 4
    total = (consumos_variables_factor_uso * f_uso) + \
        (consumos_variables_lineales * f_uso_lineal) + consumos_fijos
    return (total, total * compania[response["n_compania"]])

print(consumo_mensual())
