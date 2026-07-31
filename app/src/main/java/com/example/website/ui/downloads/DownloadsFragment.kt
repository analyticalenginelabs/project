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

package com.example.website.ui.downloads

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import com.example.website.databinding.FragmentDownloadsBinding

class DownloadsFragment : Fragment() {

    private var _binding: FragmentDownloadsBinding? = null

    // This property is only valid between onCreateView and
    // onDestroyView.
    private val binding get() = _binding!!

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        val downloadsViewModel =
            ViewModelProvider(this).get(DownloadsViewModel::class.java)

        _binding = FragmentDownloadsBinding.inflate(inflater, container, false)
        val root: View = binding.root

        val textView: TextView = binding.textDownloadsSubtitle
        downloadsViewModel.text.observe(viewLifecycleOwner) {
            textView.text = it
        }
        return root
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}