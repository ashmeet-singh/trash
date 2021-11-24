import numpy as np

rng = np.random.default_rng()


def create(network_design, weights_min, weights_max, biases_min, biases_max):
    new_network = {'weights': [], 'biases': [],
                   'layer_count': (len(network_design) - 1)}
    for i in range(len(network_design) - 1):
        input_neuron_count = network_design[i]
        output_neuron_count = network_design[i + 1]
        new_network['weights'].append(rng.integers(
            low=weights_min, high=weights_max, size=(output_neuron_count, input_neuron_count), dtype=np.int32, endpoint=True))
        new_network['biases'].append(rng.integers(
            low=biases_min, high=biases_max, size=(output_neuron_count), dtype=np.int32, endpoint=True))
    return new_network


def get_output(input, network):
    store = input
    for i in range(network['layer_count']):
        store = np.heaviside(
            np.dot(network['weights'][i], store) + network['biases'][i], 0).astype(np.int32)
    return store


def change_randomly(network, weights_min, weights_max, biases_min, biases_max):
    for i in range(network['layer_count']):
        network['weights'][i] = network['weights'][i] + rng.integers(
            low=weights_min, high=weights_max, size=(len(network['weights'][i]), len(network['weights'][i][0])), dtype=np.int32, endpoint=True)
        network['biases'][i] = network['biases'][i] + rng.integers(
            low=biases_min, high=biases_max, size=(len(network['biases'][i])), dtype=np.int32, endpoint=True)
    return network
