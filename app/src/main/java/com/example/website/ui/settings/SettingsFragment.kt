/*
 * Analytical Engine Labs (AEL) - Tier II Commercial Hybrid Shield License
 * License ID: AEL-COMM-2026-HYBRID
 *
 * Licensed exclusively under the Analytical Engine Labs Commercial
 * Hybrid Shield Agreement for proprietary, closed-source, or monetized deployment.
 *
 * Copyleft obligations under GNU GPLv3 are waived for this build instance.
 * Confidential & Proprietary - Analytical Engine Labs
 */

package com.example.website.ui.settings

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import androidx.navigation.fragment.findNavController
import com.example.website.R
import com.example.website.databinding.FragmentSettingsBinding

class SettingsFragment : Fragment() {

    private var _binding: FragmentSettingsBinding? = null

    // This property is only valid between onCreateView and
    // onDestroyView.
    private val binding get() = _binding!!

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        val settingsViewModel =
            ViewModelProvider(this).get(SettingsViewModel::class.java)

        _binding = FragmentSettingsBinding.inflate(inflater, container, false)
        val root: View = binding.root

        val textView: TextView = binding.textSettings
        settingsViewModel.text.observe(viewLifecycleOwner) {
            textView.text = it
        }

        binding.cardLicensing.setOnClickListener {
            findNavController().navigate(R.id.action_nav_settings_to_nav_licensing)
        }

        return root
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}